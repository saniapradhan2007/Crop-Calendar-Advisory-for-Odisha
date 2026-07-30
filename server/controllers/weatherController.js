const Weather = require('../models/Weather');
const { isMock, mockStore } = require('../config/db');

// Realistic base values for Odisha districts
const odishaDistrictCoords = {
  Angul: { temp: 33, humidity: 75, wind: 12, rain: 45, condition: 'Light Rain', icon: 'fa-cloud-sun-rain' },
  Balasore: { temp: 31, humidity: 82, wind: 18, rain: 60, condition: 'Heavy Rain Alert', icon: 'fa-cloud-showers-heavy' },
  Bargarh: { temp: 34, humidity: 68, wind: 10, rain: 20, condition: 'Partly Cloudy', icon: 'fa-cloud-sun' },
  Bhadrak: { temp: 32, humidity: 80, wind: 16, rain: 55, condition: 'Thunderstorm', icon: 'fa-bolt' },
  Bolangir: { temp: 36, humidity: 60, wind: 14, rain: 10, condition: 'Sunny / Warm', icon: 'fa-sun' },
  Cuttack: { temp: 32, humidity: 78, wind: 14, rain: 35, condition: 'Scattered Showers', icon: 'fa-cloud-rain' },
  Dhenkanal: { temp: 33, humidity: 74, wind: 11, rain: 30, condition: 'Cloudy', icon: 'fa-cloud' },
  Ganjam: { temp: 30, humidity: 85, wind: 22, rain: 70, condition: 'Coastal Wind & Rain', icon: 'fa-wind' },
  Jagatsinghpur: { temp: 31, humidity: 84, wind: 20, rain: 65, condition: 'Heavy Rain Warning', icon: 'fa-cloud-showers-heavy' },
  Jajpur: { temp: 32, humidity: 76, wind: 13, rain: 40, condition: 'Passing Showers', icon: 'fa-cloud-sun-rain' },
  Jharsuguda: { temp: 35, humidity: 64, wind: 9, rain: 15, condition: 'Partly Cloudy', icon: 'fa-cloud-sun' },
  Kalahandi: { temp: 34, humidity: 66, wind: 12, rain: 25, condition: 'Cloudy', icon: 'fa-cloud' },
  Kandhamal: { temp: 28, humidity: 88, wind: 8, rain: 50, condition: 'Mist & Moderate Rain', icon: 'fa-cloud-rain' },
  Kendrapara: { temp: 30, humidity: 86, wind: 21, rain: 68, condition: 'High Humidity & Showers', icon: 'fa-cloud-showers-heavy' },
  Kendujhar: { temp: 31, humidity: 72, wind: 11, rain: 35, condition: 'Light Rain', icon: 'fa-cloud-rain' },
  Khordha: { temp: 32, humidity: 77, wind: 15, rain: 40, condition: 'Scattered Rain', icon: 'fa-cloud-sun-rain' },
  Koraput: { temp: 26, humidity: 90, wind: 10, rain: 80, condition: 'Heavy Hill Rainfall', icon: 'fa-cloud-showers-heavy' },
  Malkangiri: { temp: 29, humidity: 85, wind: 12, rain: 75, condition: 'Monsoon Rain', icon: 'fa-cloud-showers-heavy' },
  Mayurbhanj: { temp: 32, humidity: 78, wind: 14, rain: 45, condition: 'Thunderstorm Warning', icon: 'fa-bolt' },
  Nabarangpur: { temp: 28, humidity: 86, wind: 11, rain: 60, condition: 'Moderate Rainfall', icon: 'fa-cloud-rain' },
  Nayagarh: { temp: 33, humidity: 73, wind: 12, rain: 30, condition: 'Partly Cloudy', icon: 'fa-cloud-sun' },
  Nuapada: { temp: 35, humidity: 62, wind: 13, rain: 12, condition: 'Sunny', icon: 'fa-sun' },
  Puri: { temp: 30, humidity: 88, wind: 24, rain: 55, condition: 'High Wind & Coastal Rain', icon: 'fa-wind' },
  Rayagada: { temp: 30, humidity: 82, wind: 11, rain: 50, condition: 'Light Rain', icon: 'fa-cloud-rain' },
  Sambalpur: { temp: 35, humidity: 65, wind: 10, rain: 18, condition: 'Warm & Dry Spells', icon: 'fa-sun' },
  Subarnapur: { temp: 36, humidity: 62, wind: 11, rain: 15, condition: 'Hot & Humid', icon: 'fa-sun' },
  Sundargarh: { temp: 33, humidity: 69, wind: 10, rain: 22, condition: 'Passing Clouds', icon: 'fa-cloud-sun' }
};

// Get District Weather
exports.getWeatherByDistrict = async (req, res) => {
  try {
    const districtName = req.params.district || 'Cuttack';
    const base = odishaDistrictCoords[districtName] || odishaDistrictCoords['Cuttack'];

    const alerts = [];
    if (base.rain > 50) alerts.push(`⚠️ Heavy Rain Warning: Ensure proper field drainage for ${districtName}.`);
    if (base.temp > 35) alerts.push(`☀️ Heatwave Alert: Provide timely irrigation to young saplings.`);
    if (base.wind > 20) alerts.push(`🌬️ Strong Wind Alert: Secure banana/sugarcane stalks.`);

    const weatherData = {
      district: districtName,
      temperature: base.temp,
      humidity: base.humidity,
      windSpeed: base.wind,
      rainfall: base.rain,
      pressure: 1008,
      uvIndex: base.temp > 33 ? 8 : 5,
      condition: base.condition,
      icon: base.icon,
      alerts,
      forecast: [
        { day: 'Today', temp: base.temp, condition: base.condition, rainChance: base.rain },
        { day: 'Tomorrow', temp: base.temp - 1, condition: 'Moderate Rain', rainChance: Math.min(100, base.rain + 10) },
        { day: 'Day 3', temp: base.temp + 1, condition: 'Partly Cloudy', rainChance: Math.max(0, base.rain - 20) },
        { day: 'Day 4', temp: base.temp, condition: 'Sunny', rainChance: 15 },
        { day: 'Day 5', temp: base.temp + 2, condition: 'Clear Sky', rainChance: 5 }
      ],
      updatedAt: new Date()
    };

    res.json({ success: true, data: weatherData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
