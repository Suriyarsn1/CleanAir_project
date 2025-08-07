import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import joblib

# Load dataset
data = pd.read_csv("survey_lung_cancer.csv")

# Inspect data
print(data.head())
print(data.info())

# Map diagnosis column to numeric labels (YES=1, NO=0)
data['LUNG_CANCER'] = data['LUNG_CANCER'].map({'YES': 1, 'NO': 0})

# Encode 'GENDER' categorical feature: M=1, F=0 
data['GENDER'] = data['GENDER'].map({'M': 1, 'F': 0})

# Check for missing values
print("Missing values per column:\n", data.isnull().sum())

# Features (all columns except target)
X = data.drop('LUNG_CANCER', axis=1)

# Target
y = data['LUNG_CANCER']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Model initialization with some hyperparameters tuning
clf = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42,
    class_weight='balanced'  
)

# Train model
clf.fit(X_train, y_train)

# Save trained model
joblib.dump(clf, "lung_cancer_model.joblib")

# Evaluate on test set
y_pred = clf.predict(X_test)

print("Classification Report:")
print(classification_report(y_test, y_pred))

print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

accuracy = clf.score(X_test, y_test)
print(f"Test accuracy: {accuracy:.2f}")

# Show feature importances
importances = clf.feature_importances_
feature_names = X.columns
feat_imp_df = pd.DataFrame({'feature': feature_names, 'importance': importances})
feat_imp_df = feat_imp_df.sort_values(by='importance', ascending=False)

print("\nFeature Importances:")
print(feat_imp_df)

