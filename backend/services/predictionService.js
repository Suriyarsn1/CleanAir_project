const axios = require('axios');
require('dotenv').config()

const GENDER_MAP = { 'M': 1, 'F': 0 };

function preprocessInput(input) {
  const processed = { ...input };

  // Map gender string to numeric safely
  if (processed.GENDER) {
    if (typeof processed.GENDER === "string") {
      const genderUpper = processed.GENDER.trim().toUpperCase();
      processed.GENDER = GENDER_MAP[genderUpper] !== undefined ? GENDER_MAP[genderUpper] : 0;
    } else if (typeof processed.GENDER === "number") {
     
    } else {
      processed.GENDER = 0;
    }
  } else {
    processed.GENDER = 0; 
  }

  // Ensure all expected features are present with default 0 if missing
  const FEATURE_COLUMNS = [
    "AGE", "GENDER", "SMOKING", "YELLOW_FINGERS", "ANXIETY", "PEER_PRESSURE",
    "CHRONIC_DISEASE", "FATIGUE", "ALLERGY", "WHEEZING", "ALCOHOL_CONSUMING",
    "COUGHING", "SHORTNESS_OF_BREATH", "SWALLOWING_DIFFICULTY", "CHEST_PAIN"
  ];

  FEATURE_COLUMNS.forEach(col => {
    if (!(col in processed)) {
      processed[col] = 0;
    }
  });

  return processed;
}

exports.getPrediction = async (inputData) => {
  console.log('Calling prediction service');

  const features = preprocessInput(inputData);

  try {
    const response = await axios.post('http://127.0.0.1:6000/predict', { features });

    return {
      prediction: response.data.prediction,
      probability: response.data.probability || null,
    };
  } catch (error) {
    console.error('Prediction service error:', error);
    throw error;
  }
};
