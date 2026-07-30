const Market = require('../models/Market');
const { isMock, mockStore } = require('../config/db');

// Get market prices with district & crop filters
exports.getMarketPrices = async (req, res) => {
  try {
    const { district, crop, search } = req.query;

    if (isMock()) {
      let items = [...mockStore.market];
      if (district && district !== 'All') {
        items = items.filter(m => m.district === district || m.district === 'All');
      }
      if (crop && crop !== 'All') {
        items = items.filter(m => m.crop === crop);
      }
      if (search) {
        const q = search.toLowerCase();
        items = items.filter(m => m.crop.toLowerCase().includes(q) || m.district.toLowerCase().includes(q));
      }
      return res.json({ success: true, count: items.length, data: items });
    }

    const filter = {};
    if (district && district !== 'All') filter.$or = [{ district }, { district: 'All' }];
    if (crop && crop !== 'All') filter.crop = crop;
    if (search) {
      filter.$or = [
        { crop: new RegExp(search, 'i') },
        { district: new RegExp(search, 'i') }
      ];
    }

    const items = await Market.find(filter).sort({ crop: 1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update or Create Market Price
exports.updateMarketPrice = async (req, res) => {
  try {
    const { crop, district, todayPrice, yesterdayPrice, mandi } = req.body;
    if (!crop || !district || !todayPrice) {
      return res.status(400).json({ success: false, message: 'Crop, district, and today price are required' });
    }

    const yPrice = yesterdayPrice || todayPrice;
    let trend = 'Stable';
    if (todayPrice > yPrice) trend = 'Up';
    else if (todayPrice < yPrice) trend = 'Down';

    if (isMock()) {
      const idx = mockStore.market.findIndex(m => m.crop === crop && m.district === district);
      const record = {
        _id: idx !== -1 ? mockStore.market[idx]._id : 'mock_mkt_' + Date.now(),
        crop,
        district,
        todayPrice,
        yesterdayPrice: yPrice,
        trend,
        mandi: mandi || `${district} Mandi`,
        updatedAt: new Date()
      };

      if (idx !== -1) mockStore.market[idx] = record;
      else mockStore.market.push(record);

      return res.status(200).json({ success: true, message: 'Market price updated', data: record });
    }

    const record = await Market.findOneAndUpdate(
      { crop, district },
      { todayPrice, yesterdayPrice: yPrice, trend, mandi: mandi || `${district} Mandi`, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, message: 'Market price updated', data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
