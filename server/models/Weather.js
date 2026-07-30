const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  district: { type: String, required: true },
  temperature: { type: Number },
  humidity: { type: Number },
  windSpeed: { type: Number },
  rainfall: { type: Number },
  pressure: { type: Number },
  uvIndex: { type: Number },
  condition: { type: String },
  icon: { type: String },
  alerts: [String],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weather', weatherSchema);
