const mongoose = require('mongoose');

const cropStageSchema = new mongoose.Schema({
  stageName: { type: String, required: true },
  durationDays: { type: String },
  activities: [String],
  fertilizers: [String],
  pestsAndDiseases: [String]
});

const cropSchema = new mongoose.Schema({
  crop: { type: String, required: true }, // e.g. Paddy, Maize, Groundnut
  district: { type: String, required: true }, // e.g. Cuttack, Bargarh, All
  season: { type: String, enum: ['Kharif', 'Rabi', 'Zaid', 'All'], required: true },
  sowingDate: { type: String },
  harvestDate: { type: String },
  durationMonths: { type: Number },
  soilRequirement: { type: String },
  seedRate: { type: String },
  stages: [cropStageSchema],
  advisory: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Crop', cropSchema);
