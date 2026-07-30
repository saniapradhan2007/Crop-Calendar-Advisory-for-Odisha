const mongoose = require('mongoose');

const advisorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  crop: { type: String, default: 'All' },
  district: { type: String, default: 'All' },
  category: { type: String, enum: ['Weather', 'Fertilizer', 'Pest Alert', 'Disease Alert', 'Irrigation', 'General'], default: 'General' },
  description: { type: String, required: true },
  severity: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  preventiveAction: { type: String },
  chemicalTreatment: { type: String },
  organicTreatment: { type: String },
  image: { type: String, default: '' },
  publishedBy: { type: String, default: 'Agriculture Dept., Odisha' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Advisory', advisorySchema);
