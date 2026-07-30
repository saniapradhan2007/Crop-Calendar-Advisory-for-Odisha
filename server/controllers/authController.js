const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { isMock, mockStore } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'odisha_agri_smart_advisory_secret_key_2026';

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, district, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    if (isMock()) {
      const existing = mockStore.users.find(u => u.email === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        _id: 'mock_usr_' + Date.now(),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || 'Farmer',
        district: district || 'Cuttack',
        phone: phone || '',
        createdAt: new Date()
      };
      mockStore.users.push(newUser);

      const token = jwt.sign(
        { id: newUser._id, email: newUser.email, role: newUser.role, name: newUser.name, district: newUser.district },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, district: newUser.district }
      });
    }

    // Mongoose DB
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'Farmer',
      district: district || 'Cuttack',
      phone: phone || ''
    });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name, district: user.district },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, district: user.district }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    if (isMock()) {
      const user = mockStore.users.find(u => u.email === email.toLowerCase());
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role, name: user.name, district: user.district },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role, district: user.district }
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name, district: user.district },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, district: user.district }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Current User Profile
exports.getMe = async (req, res) => {
  try {
    if (isMock()) {
      const user = mockStore.users.find(u => u._id === req.user.id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      return res.json({ success: true, user });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Users (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    if (isMock()) {
      return res.json({ success: true, users: mockStore.users.map(({ password, ...u }) => u) });
    }
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
