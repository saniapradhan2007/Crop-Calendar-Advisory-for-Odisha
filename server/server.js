const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/db');
const seedData = require('./seed');

const authRoutes = require('./routes/authRoutes');
const cropRoutes = require('./routes/cropRoutes');
const advisoryRoutes = require('./routes/advisoryRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const marketRoutes = require('./routes/marketRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Force zero browser cache on all static HTML/JS/CSS files
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// Serve static frontend and uploads with zero caching
app.use(express.static(path.join(__dirname, '../client'), {
  etag: false,
  maxAge: 0
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  etag: false,
  maxAge: 0
}));

// REST API Routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/advisories', advisoryRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Fallback to client SPA/index for non-API GET requests
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start Server
const startServer = async () => {
  await connectDB();
  await seedData(); // Ensure sample Odisha crop data & seed accounts are loaded

  app.listen(PORT, () => {
    console.log(`🚀 Odisha Crop Calendar & Smart Advisory Server running on http://localhost:${PORT}`);
  });
};

startServer();
