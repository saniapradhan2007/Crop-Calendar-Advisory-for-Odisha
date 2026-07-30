const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', marketController.getMarketPrices);
router.post('/', authMiddleware, authorizeRoles('Agriculture Officer', 'Admin'), marketController.updateMarketPrice);

module.exports = router;
