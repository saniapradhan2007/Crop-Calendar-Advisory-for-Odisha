const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  district: { type: String, required: true },
  todayPrice: { type: Number, required: true }, // in ₹ per Quintal
  yesterdayPrice: { type: Number, required: true },
  trend: { type: String, enum: ['Up', 'Down', 'Stable'], default: 'Stable' },
  mandi: { type: String, default: 'District Main Mandi' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Market', marketSchema);
