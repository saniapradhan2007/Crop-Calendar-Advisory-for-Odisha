const express = require('express');
const router = express.Router();
const advisoryController = require('../controllers/advisoryController');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', advisoryController.getAdvisories);
router.post('/detect-disease', advisoryController.detectDisease);
router.post('/', authMiddleware, authorizeRoles('Agriculture Officer', 'Admin'), advisoryController.createAdvisory);
router.delete('/:id', authMiddleware, authorizeRoles('Agriculture Officer', 'Admin'), advisoryController.deleteAdvisory);

module.exports = router;
