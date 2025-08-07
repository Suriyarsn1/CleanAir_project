from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import traceback

app = Flask(__name__)

# Load your trained model
model = joblib.load('lung_cancer_model.joblib')

# Define the expected feature columns in the exact order used during training
FEATURE_COLUMNS = [
    "AGE", "GENDER", "SMOKING", "YELLOW_FINGERS", "ANXIETY", "PEER_PRESSURE",
    "CHRONIC_DISEASE", "FATIGUE", "ALLERGY", "WHEEZING", "ALCOHOL_CONSUMING",
    "COUGHING", "SHORTNESS_OF_BREATH", "SWALLOWING_DIFFICULTY", "CHEST_PAIN"
]

# If during training you used numeric encoding like mapping gender 'M'->1, 'F'->0,
# declare encoding mappings here:
GENDER_MAP = {"M": 1, "F": 0}


def preprocess_input(input_dict):
    """
    Preprocess input to match training features.
    - Maps gender to numeric.
    - Ensures all feature columns exist, ordering them.
    - Fill missing features with 0.
    """
    # Create a DataFrame with 1 row from input dict
    df = pd.DataFrame([input_dict])

    # Encode gender if present as string
    if 'GENDER' in df.columns:
        df['GENDER'] = df['GENDER'].map(GENDER_MAP).fillna(0).astype(int)

    # Ensure all features are present, fill missing with 0
    for col in FEATURE_COLUMNS:
        if col not in df.columns:
            df[col] = 0

    # Reorder columns to match training order
    df = df[FEATURE_COLUMNS]

    return df


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing JSON in request body"}), 400

        # Expect input as a JSON dict keyed by feature names (not array)
        # For example:
        # {
        #   "AGE": 45,
        #   "GENDER": "M",
        #   "SMOKING": 1,
        #   ...
        # }
        input_features = data.get('features')
        if not input_features or not isinstance(input_features, dict):
            return jsonify({"error": "Request JSON must contain 'features' dict with feature values"}), 400

        # Preprocess the input
        X = preprocess_input(input_features)

        # Predict using the model
        prediction = model.predict(X)
        prediction_proba = None
        if hasattr(model, "predict_proba"):
            prediction_proba = model.predict_proba(X)[:, 1]  # Probability of positive class

        response = {
            "prediction": int(prediction[0]),
        }
        if prediction_proba is not None:
            response["probability"] = float(prediction_proba[0])

        return jsonify(response)

    except Exception as e:
        print("Exception during prediction:", e)
        traceback.print_exc()
        return jsonify({'error': 'Prediction failed due to server error'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=6000)
