const Prediction = require('../models/mlmodel');
const { getPrediction } = require('../services/predictionService');


exports.predict = async (req, res) => {
  try {
    const inputData = req.body.features;  

    console.log('Received input features:', inputData);

    if (!inputData || typeof inputData !== 'object' || Array.isArray(inputData)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Call your prediction service 
    const output = await getPrediction(inputData);

    // Save prediction record 
    const record = new Prediction({
      input: inputData,
      output,
      user: req.userId 
    });

    await record.save();
    return res.json({ output });

  } catch (err) {
    console.error('Prediction Error:', err);
    return res.status(500).json({ error: err.message || 'Server error in prediction' });
  }
};

exports.history = async (req, res) => {
  try {
    console.log('Fetching prediction history for user:', req.userId);

    if (!req.userId) {
      return res.status(401).json({ message: 'Session expired. Please login again.' });
    }

    // Retrieve all prediction
    const data = await Prediction.find({ user: req.userId }).sort({ date: -1 });

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'You have not recorded any predictions yet.' });
    }

    return res.json({ data });

  } catch (error) {
    console.error('Error fetching history:', error);
    return res.status(500).json({ message: 'Server error while fetching history.' });
  }
};
