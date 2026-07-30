const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.getMe);
router.get('/users', authMiddleware, authorizeRoles('Admin'), authController.getAllUsers);

module.exports = router;
