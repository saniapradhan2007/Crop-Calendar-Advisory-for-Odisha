const Advisory = require('../models/Advisory');
const { isMock, mockStore } = require('../config/db');

// Get Advisories with district, crop, and severity filters
exports.getAdvisories = async (req, res) => {
  try {
    const { district, crop, category, severity } = req.query;

    if (isMock()) {
      let results = [...mockStore.advisories];
      if (district && district !== 'All') {
        results = results.filter(a => a.district === district || a.district === 'All');
      }
      if (crop && crop !== 'All') {
        results = results.filter(a => a.crop === crop || a.crop === 'All');
      }
      if (category && category !== 'All') {
        results = results.filter(a => a.category === category);
      }
      if (severity && severity !== 'All') {
        results = results.filter(a => a.severity === severity);
      }
      return res.json({ success: true, count: results.length, data: results });
    }

    const filter = {};
    if (district && district !== 'All') filter.$or = [{ district }, { district: 'All' }];
    if (crop && crop !== 'All') filter.crop = { $in: [crop, 'All'] };
    if (category && category !== 'All') filter.category = category;
    if (severity && severity !== 'All') filter.severity = severity;

    const advisories = await Advisory.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: advisories.length, data: advisories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create Advisory
exports.createAdvisory = async (req, res) => {
  try {
    const advisoryData = req.body;
    if (!advisoryData.title || !advisoryData.description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    if (isMock()) {
      const newAdv = {
        _id: 'mock_adv_' + Date.now(),
        ...advisoryData,
        createdAt: new Date()
      };
      mockStore.advisories.unshift(newAdv);
      return res.status(201).json({ success: true, message: 'Advisory published successfully', data: newAdv });
    }

    const newAdv = await Advisory.create(advisoryData);
    res.status(201).json({ success: true, message: 'Advisory published successfully', data: newAdv });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Advisory
exports.deleteAdvisory = async (req, res) => {
  try {
    if (isMock()) {
      const idx = mockStore.advisories.findIndex(a => a._id === req.params.id);
      if (idx !== -1) mockStore.advisories.splice(idx, 1);
      return res.json({ success: true, message: 'Advisory deleted' });
    }

    await Advisory.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Advisory deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
