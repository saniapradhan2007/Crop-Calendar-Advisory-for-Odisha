const mongoose = require('mongoose');

let isConnected = false;
let useMock = false;

// Memory storage engine fallback if MongoDB Atlas / local DB connection is not present
const mockStore = {
  users: [],
  crops: [],
  advisories: [],
  weather: [],
  market: []
};

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/odisha_crop_db';
  try {
    // Attempt Mongoose connection with 3-second timeout
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000
    });
    isConnected = true;
    useMock = false;
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.warn('⚠️ MongoDB connection unavailable. Operating in persistent mock database mode.');
    useMock = true;
    isConnected = false;
  }
};

module.exports = {
  connectDB,
  isMock: () => useMock,
  mockStore
};
