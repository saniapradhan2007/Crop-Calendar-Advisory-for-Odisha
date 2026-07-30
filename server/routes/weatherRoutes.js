const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/:district', weatherController.getWeatherByDistrict);
router.get('/', weatherController.getWeatherByDistrict);

module.exports = router;
