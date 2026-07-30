const express = require('express');
const router = express.Router();
const cropController = require('../controllers/cropController');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', cropController.getCrops);
router.get('/:id', cropController.getCropById);
router.post('/', authMiddleware, authorizeRoles('Agriculture Officer', 'Admin'), cropController.createCrop);
router.delete('/:id', authMiddleware, authorizeRoles('Agriculture Officer', 'Admin'), cropController.deleteCrop);

module.exports = router;
