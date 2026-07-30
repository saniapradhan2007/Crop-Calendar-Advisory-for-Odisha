const Crop = require('../models/Crop');
const { isMock, mockStore } = require('../config/db');

// Get Crops with smart district & crop fallback for all 30 Odisha districts
exports.getCrops = async (req, res) => {
  try {
    let { district, season, crop, search } = req.query;

    let cropsList = [];
    if (!isMock()) {
      cropsList = await Crop.find().lean();
    }
    if (!cropsList || cropsList.length === 0) {
      cropsList = [...mockStore.crops];
    }

    let list = cropsList;

    // 1. Filter by Crop
    if (crop && crop !== 'All') {
      let matchCrop = list.filter(c => c.crop.toLowerCase() === crop.toLowerCase());
      if (matchCrop.length > 0) {
        list = matchCrop;
      }
    }

    // 2. Filter by Season
    if (season && season !== 'All') {
      let matchSeason = list.filter(c => c.season.toLowerCase() === season.toLowerCase() || c.season === 'All');
      if (matchSeason.length > 0) {
        list = matchSeason;
      }
    }

    // 3. Filter by Search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.crop.toLowerCase().includes(q) ||
        c.district.toLowerCase().includes(q) ||
        c.season.toLowerCase().includes(q)
      );
    }

    // 4. District matching with Fallback
    if (district && district !== 'All') {
      let matchDistrict = list.filter(c => c.district.toLowerCase() === district.toLowerCase());
      if (matchDistrict.length > 0) {
        list = matchDistrict;
      } else {
        // If no district-specific entry, adapt the matching crop templates for this district!
        list = list.map(c => ({
          ...c,
          district: district,
          advisory: c.advisory || `Recommended crop schedule for ${c.crop} in ${district} district.`
        }));
      }
    }

    // 5. If list is somehow empty, fall back to mockStore items adapted for district
    if (list.length === 0 && mockStore.crops.length > 0) {
      list = mockStore.crops.map(c => ({
        ...c,
        district: (district && district !== 'All') ? district : 'Odisha District'
      }));
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single crop by ID
exports.getCropById = async (req, res) => {
  try {
    if (isMock()) {
      const item = mockStore.crops.find(c => c._id === req.params.id);
      if (!item) return res.status(404).json({ success: false, message: 'Crop schedule not found' });
      return res.json({ success: true, data: item });
    }

    const item = await Crop.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Crop schedule not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create new crop schedule (Agriculture Officer or Admin)
exports.createCrop = async (req, res) => {
  try {
    const cropData = req.body;
    if (!cropData.crop || !cropData.district || !cropData.season) {
      return res.status(400).json({ success: false, message: 'Crop name, district, and season are required' });
    }

    if (isMock()) {
      const newCrop = {
        _id: 'mock_crop_' + Date.now(),
        ...cropData,
        createdAt: new Date()
      };
      mockStore.crops.push(newCrop);
      return res.status(201).json({ success: true, message: 'Crop schedule created successfully', data: newCrop });
    }

    const newCrop = await Crop.create(cropData);
    res.status(201).json({ success: true, message: 'Crop schedule created successfully', data: newCrop });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Crop Schedule
exports.deleteCrop = async (req, res) => {
  try {
    if (isMock()) {
      const index = mockStore.crops.findIndex(c => c._id === req.params.id);
      if (index === -1) return res.status(404).json({ success: false, message: 'Crop not found' });
      mockStore.crops.splice(index, 1);
      return res.json({ success: true, message: 'Crop schedule deleted' });
    }

    await Crop.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Crop schedule deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
