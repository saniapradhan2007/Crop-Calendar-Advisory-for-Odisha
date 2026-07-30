# 🌾 Odisha Crop Calendar & Smart Advisory System (Full Stack)

A full-stack agricultural management web application designed for farmers, agricultural officers, and administrators across all 30 districts of Odisha.

---

## 🚀 Features

- **🌾 30 Districts Crop Calendar**: Interactive filter by District, Season (Kharif, Rabi, Zaid), and Crop Type (Paddy, Maize, Groundnut, Mustard, Green Gram, Cotton, Sugarcane, Millet, etc.) with a step-by-step activity timeline.
- **⚡ Smart Advisory & Pest Diagnostic**: Diagnostic cards for common Odisha pests (BPH, Stem Borer, Blast Disease, Fall Armyworm, Aphids) with symptoms, causes, organic & chemical remedies.
- **🧪 N-P-K Fertilizer Calculator**: Computes precise Urea, DAP, SSP & MOP dosage per acre according to crop & growth stage.
- **🌤️ Live Weather & Extreme Warning Alerts**: Live weather parameters (temp, humidity, wind, rainfall, UV index) and 5-day forecast cards for every district in Odisha.
- **📈 APMC Mandi Market Prices**: Daily crop price tracking across Odisha mandis with trend indicators (+/- ₹) and Chart.js graph visualization.
- **🤖 AI Krushi Assistant**: Chatbot supporting Gemini/OpenAI API with fallback expert knowledge base for Odisha agriculture, typing animations, speech synthesis, and voice recognition (Web Speech API).
- **🏛️ Government Schemes**: Information and application links for KALIA Scheme, PM-KISAN, PMFBY Crop Insurance, Soil Health Card, etc.
- **👥 Role-Based Management**: Distinct portals for Farmers, Agriculture Officers (add crop schedules, publish advisories), and Admins (manage users, market prices & platform analytics).
- **🌐 Odia & English Language Support**: Instant i18n language toggle.
- **🌙 Dark Mode & Glassmorphic UI**: Vibrant, responsive modern Bootstrap 5 UI design.
- **📱 PWA & Offline Support**: Progressive Web App with manifest and service worker.

---

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3 (Glassmorphism design, CSS Variables)
- JavaScript (ES6 Modules)
- Bootstrap 5
- Chart.js
- Font Awesome 6
- Web Speech API (Voice Assistant)

### Backend
- Node.js & Express.js
- Mongoose / MongoDB (with auto fallback mock database engine)
- JWT Authentication & bcryptjs password hashing

---

## 📦 Installation & Setup

1. **Clone or Navigate to Project Directory**:
   ```bash
   cd "c:\Users\user\Desktop\Crop Calender &   Advisory"
   ```

2. **Install Server Dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/odisha_crop_db
   JWT_SECRET=odisha_agri_smart_advisory_secret_key_2026
   OPENWEATHER_API_KEY=your_key_here
   GEMINI_API_KEY=your_key_here
   ```

4. **Start the Application**:
   ```bash
   npm start
   ```

5. **Access the Portal**:
   Open browser at: `http://localhost:5000`

---

## 🔑 Demo Accounts

| Role | Email | Password |
| --- | --- | --- |
| **Farmer** | `farmer@odisha.gov.in` | `farmer123` |
| **Agriculture Officer** | `officer@odisha.gov.in` | `officer123` |
| **Admin** | `admin@odisha.gov.in` | `admin123` |

---

## 📡 REST API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/crops` - Get crop schedules (filter by district, season, crop)
- `POST /api/crops` - Add crop schedule (Officer/Admin)
- `GET /api/advisories` - Get smart advisories & bulletins
- `POST /api/advisories` - Publish advisory (Officer/Admin)
- `GET /api/weather/:district` - Get live weather for district
- `GET /api/market` - Get mandi prices & trends
- `POST /api/market` - Update mandi price (Officer/Admin)
- `POST /api/chatbot` - Query AI Krushi Assistant
