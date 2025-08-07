const mongoose = require('mongoose');
const predictionSchema = new mongoose.Schema({
  input: Array,
  output: Array,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
});
module.exports = mongoose.model('Prediction', predictionSchema);
