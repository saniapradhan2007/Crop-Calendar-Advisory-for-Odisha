const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

const { connectDB, isMock, mockStore } = require('./config/db');
const User = require('./models/User');
const Crop = require('./models/Crop');
const Advisory = require('./models/Advisory');
const Market = require('./models/Market');

const odishaDistricts = [
  'Angul', 'Balasore', 'Bargarh', 'Bhadrak', 'Bolangir', 'Cuttack', 'Dhenkanal',
  'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal',
  'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj',
  'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur',
  'Subarnapur', 'Sundargarh'
];

// Comprehensive crop schedules for all major Odisha crops
const defaultCropTemplates = [
  {
    crop: 'Paddy',
    district: 'All',
    season: 'Kharif',
    sowingDate: 'June 15 - July 15',
    harvestDate: 'October 25 - November 20',
    durationMonths: 4,
    soilRequirement: 'Clay loam to heavy clay soils with high water retention.',
    seedRate: '20-25 kg/acre for transplanting; 35-40 kg/acre for direct broadcasting',
    stages: [
      { stageName: 'Land Preparation', durationDays: '1-10 Days', activities: ['Plowing 3-4 times', 'Puddling and leveling field', 'Applying FYM @ 4 tonnes/acre'], fertilizers: ['Well-rotted Farmyard Manure (FYM)'], pestsAndDiseases: ['Weed control'] },
      { stageName: 'Seed Treatment & Nursery', durationDays: '11-25 Days', activities: ['Soak seeds in 1% salt solution', 'Treat with Carbendazim 2g/kg seed', 'Prepare wet nursery bed'], fertilizers: ['Urea 1kg per decimal nursery bed'], pestsAndDiseases: ['Damping off'] },
      { stageName: 'Transplanting', durationDays: '25-35 Days', activities: ['Transplant 21-25 day seedlings', 'Maintain 2-3 seedlings per hill', '20x15 cm hill spacing'], fertilizers: ['SSP (150kg/acre) & MOP (40kg/acre) + 25% Urea'], pestsAndDiseases: ['Root rot'] },
      { stageName: 'Tillering & Weeding', durationDays: '36-60 Days', activities: ['Apply Cono-weeder or hand weeding', 'Maintain 2-3 cm standing water'], fertilizers: ['Top dress 50% Urea (50kg/acre)'], pestsAndDiseases: ['Stem Borer', 'Gall Midge'] },
      { stageName: 'Panicle Initiation & Flowering', durationDays: '61-90 Days', activities: ['Maintain continuous shallow submerged water (3-5 cm)', 'Monitor for BPH near soil level'], fertilizers: ['Remaining 25% Urea top dressing'], pestsAndDiseases: ['Brown Plant Hopper (BPH)', 'Blast Disease'] },
      { stageName: 'Harvesting & Storage', durationDays: '110-120 Days', activities: ['Drain field 10 days before harvest', 'Harvest when 80% grains turn golden', 'Sun dry grains to 12% moisture'], fertilizers: ['None'], pestsAndDiseases: ['Storage Grain Weevil'] }
    ],
    advisory: 'Ensure timely application of Neem coated urea to prevent nitrogen loss in heavy rainfall districts.'
  },
  {
    crop: 'Vegetables',
    district: 'All',
    season: 'All',
    sowingDate: 'Year-Round (Kharif / Rabi / Zaid)',
    harvestDate: '60 - 90 Days post transplanting',
    durationMonths: 3,
    soilRequirement: 'Rich friable sandy loam with pH 6.0 - 7.0 and excellent organic content.',
    seedRate: '150 - 250 grams/acre depending on vegetable type (Tomato, Brinjal, Chilli, Okra)',
    stages: [
      { stageName: 'Soil Prep & Bed Construction', durationDays: '1-7 Days', activities: ['Deep plowing and mixing compost @ 5 tonnes/acre', 'Form raised beds of 1 meter width'], fertilizers: ['Vermicompost + Neem Cake 100kg/acre'], pestsAndDiseases: ['Soil-borne nematodes'] },
      { stageName: 'Nursery & Seedling Raising', durationDays: '8-25 Days', activities: ['Sow seeds in pro-trays using coco-peat', 'Treat seeds with Trichoderma viride @ 5g/kg'], fertilizers: ['19-19-19 NPK foliar spray 2g/L'], pestsAndDiseases: ['Damping off'] },
      { stageName: 'Transplanting & Staking', durationDays: '26-40 Days', activities: ['Transplant healthy 25-day seedlings in evening', 'Erect bamboo stakes for tomato/chilli support'], fertilizers: ['DAP 50kg/acre + MOP 30kg/acre'], pestsAndDiseases: ['Cutworms', 'Flea beetles'] },
      { stageName: 'Vegetative Growth & Flowering', durationDays: '41-60 Days', activities: ['Hoeing and mulching with paddy straw', 'Drip irrigation / regular watering'], fertilizers: ['Urea top dressing 25kg/acre'], pestsAndDiseases: ['Fruit & Shoot Borer', 'Whitefly'] },
      { stageName: 'Harvesting & Grading', durationDays: '61-90 Days', activities: ['Pick mature firm vegetables early morning', 'Grade by size and pack in ventilated crates'], fertilizers: ['None'], pestsAndDiseases: ['Post-harvest rot'] }
    ],
    advisory: 'Install yellow sticky traps @ 15 traps/acre to control sucking pests like whiteflies and thrips.'
  },
  {
    crop: 'Maize',
    district: 'All',
    season: 'Kharif',
    sowingDate: 'June 01 - June 30',
    harvestDate: 'September 15 - October 10',
    durationMonths: 3.5,
    soilRequirement: 'Well-drained fertile loamy to sandy loam soil.',
    seedRate: '8 kg/acre for hybrids; 10 kg/acre for composite varieties',
    stages: [
      { stageName: 'Sowing & Germination', durationDays: '1-15 Days', activities: ['Ridge and furrow sowing', 'Seed treatment with Thiram 3g/kg'], fertilizers: ['Basal NPK 20:40:20 (DAP 50kg, MOP 30kg)'], pestsAndDiseases: ['Fall Armyworm'] },
      { stageName: 'Knee-high Stage & Weeding', durationDays: '25-35 Days', activities: ['Earthing up around root zone', 'Hand weeding'], fertilizers: ['Top dress 50kg Urea/acre'], pestsAndDiseases: ['Fall Armyworm', 'Stem Borer'] },
      { stageName: 'Tasseling & Cob Formation', durationDays: '50-65 Days', activities: ['Maintain adequate moisture during flowering', 'Spray micronutrient Boron if deficient'], fertilizers: ['Remaining 25kg Urea top dressing'], pestsAndDiseases: ['Turcicum Leaf Blight'] },
      { stageName: 'Harvesting', durationDays: '90-100 Days', activities: ['Harvest when outer husks turn straw brown', 'Shell and dry cobs to 13% moisture'], fertilizers: ['None'], pestsAndDiseases: ['Storage pests'] }
    ],
    advisory: 'Scout regularly for Fall Armyworm egg masses on young whorls and apply sand/ash in whorls if noticed.'
  },
  {
    crop: 'Groundnut',
    district: 'All',
    season: 'Rabi',
    sowingDate: 'November 15 - December 15',
    harvestDate: 'March 15 - April 10',
    durationMonths: 4,
    soilRequirement: 'Light friable sandy loam rich in calcium.',
    seedRate: '50-60 kg kernel/acre',
    stages: [
      { stageName: 'Land Prep & Pod Sowing', durationDays: '1-15 Days', activities: ['Decorticate pods before sowing', 'Seed treatment with Rhizobium culture'], fertilizers: ['SSP 150kg/acre + Gypsum 100kg/acre'], pestsAndDiseases: ['Tikka Disease'] },
      { stageName: 'Pegging & Pod Formation', durationDays: '40-60 Days', activities: ['Apply Gypsum near root zone', 'Avoid deep hoeing after peg entry'], fertilizers: ['Gypsum top dress 100kg/acre'], pestsAndDiseases: ['Aphids', 'Rust'] },
      { stageName: 'Harvesting', durationDays: '115-125 Days', activities: ['Uproot plants when inner pod wall turns dark brown', 'Strip pods and sun dry'], fertilizers: ['None'], pestsAndDiseases: ['Pod borer'] }
    ],
    advisory: 'Gypsum application at 30-35 days is critical for healthy kernel development.'
  },
  {
    crop: 'Mustard',
    district: 'All',
    season: 'Rabi',
    sowingDate: 'October 15 - November 15',
    harvestDate: 'January 25 - February 15',
    durationMonths: 3,
    soilRequirement: 'Loam to clay loam soil with good moisture.',
    seedRate: '2.5 kg/acre',
    stages: [
      { stageName: 'Sowing & Thinning', durationDays: '1-20 Days', activities: ['Maintain 30x10 cm spacing by thinning'], fertilizers: ['NPK 30:20:20'], pestsAndDiseases: ['Mustard Aphid'] },
      { stageName: 'Flowering & Pod Filling', durationDays: '35-60 Days', activities: ['Irrigate at flowering and pod filling stage'], fertilizers: ['Urea 20kg/acre top dress'], pestsAndDiseases: ['Alternaria Blight'] },
      { stageName: 'Harvesting', durationDays: '85-95 Days', activities: ['Harvest when pods turn yellowish green'], fertilizers: ['None'], pestsAndDiseases: ['Shattering loss'] }
    ],
    advisory: 'Spray Dimethoate 30% EC if aphid population exceeds threshold.'
  },
  {
    crop: 'Green Gram',
    district: 'All',
    season: 'Rabi',
    sowingDate: 'January 01 - February 15',
    harvestDate: 'April 01 - April 30',
    durationMonths: 2.5,
    soilRequirement: 'Free draining loam soil.',
    seedRate: '10 kg/acre',
    stages: [
      { stageName: 'Sowing & Germination', durationDays: '1-15 Days', activities: ['Seed treatment with Rhizobium + PSB culture'], fertilizers: ['DAP 30kg/acre basal'], pestsAndDiseases: ['Yellow Mosaic Virus'] },
      { stageName: 'Flowering & Pod Picking', durationDays: '30-65 Days', activities: ['Pick mature pods in 2-3 flushes'], fertilizers: ['Foliar spray 2% DAP at flowering'], pestsAndDiseases: ['Pod Borer'] }
    ],
    advisory: 'Control whiteflies early using Neem oil to prevent Yellow Mosaic Virus spread.'
  },
  {
    crop: 'Black Gram',
    district: 'All',
    season: 'Rabi',
    sowingDate: 'January 15 - February 20',
    harvestDate: 'April 15 - May 10',
    durationMonths: 2.5,
    soilRequirement: 'Medium to heavy well-drained soil.',
    seedRate: '10 kg/acre',
    stages: [
      { stageName: 'Sowing & Vegetative', durationDays: '1-30 Days', activities: ['Line sowing with 30x10 cm spacing'], fertilizers: ['DAP 30kg/acre basal'], pestsAndDiseases: ['Powdery Mildew'] },
      { stageName: 'Harvesting', durationDays: '70-80 Days', activities: ['Harvest pods when black mature'], fertilizers: ['None'], pestsAndDiseases: ['Hairy Caterpillar'] }
    ],
    advisory: 'Apply Sulfur 80% WP @ 2g/L if powdery mildew spots appear on leaves.'
  },
  {
    crop: 'Cotton',
    district: 'All',
    season: 'Kharif',
    sowingDate: 'June 01 - July 10',
    harvestDate: 'November 15 - January 30',
    durationMonths: 6,
    soilRequirement: 'Deep black cotton soil or fertile alluvial loam.',
    seedRate: '1.5 - 2.0 kg Bt Cotton seed/acre',
    stages: [
      { stageName: 'Land Prep & Dibbling', durationDays: '1-20 Days', activities: ['Sow seeds at 90x60 cm spacing on ridges'], fertilizers: ['FYM 4 tonnes + DAP 50kg/acre'], pestsAndDiseases: ['Sucking pests'] },
      { stageName: 'Square Formation & Flowering', durationDays: '45-90 Days', activities: ['Nipping of terminal buds at 75 days'], fertilizers: ['Urea 35kg + MOP 25kg/acre top dress'], pestsAndDiseases: ['Pink Bollworm'] },
      { stageName: 'Boll Bursting & Picking', durationDays: '120-180 Days', activities: ['Pick clean fully opened bolls in dry weather'], fertilizers: ['None'], pestsAndDiseases: ['Boll rot'] }
    ],
    advisory: 'Install Pink Bollworm pheromone traps @ 8 traps/acre for monitoring.'
  },
  {
    crop: 'Sugarcane',
    district: 'All',
    season: 'Zaid',
    sowingDate: 'January 15 - March 15',
    harvestDate: 'December 01 - February 28',
    durationMonths: 11,
    soilRequirement: 'Deep well-drained loams rich in organic matter.',
    seedRate: '30,000 two-budded setts/acre',
    stages: [
      { stageName: 'Sett Planting & Germination', durationDays: '1-40 Days', activities: ['Treat setts with Carbendazim 0.1% solution'], fertilizers: ['DAP 100kg + MOP 50kg/acre'], pestsAndDiseases: ['Early Shoot Borer'] },
      { stageName: 'Tillering & Earthing Up', durationDays: '60-120 Days', activities: ['Heavy earthing up to prevent lodging'], fertilizers: ['Urea top dress 75kg/acre twice'], pestsAndDiseases: ['Pyrilla'] },
      { stageName: 'Harvesting', durationDays: '300-360 Days', activities: ['Cut cane close to ground level with sharp sickle'], fertilizers: ['None'], pestsAndDiseases: ['Top Borer'] }
    ],
    advisory: 'Trash mulching between rows retains moisture and suppresses weeds.'
  },
  {
    crop: 'Millet',
    district: 'All',
    season: 'Kharif',
    sowingDate: 'June 15 - July 20',
    harvestDate: 'October 01 - October 30',
    durationMonths: 3.5,
    soilRequirement: 'Red loamy, gravelly or well-drained light soil.',
    seedRate: '3-4 kg/acre for Ragi (Finger Millet)',
    stages: [
      { stageName: 'Nursery & Transplanting', durationDays: '1-25 Days', activities: ['Transplant 20-day seedlings @ 25x15 cm spacing'], fertilizers: ['Organic compost 2 tonnes/acre + NPK 20:20:20'], pestsAndDiseases: ['Blast'] },
      { stageName: 'Grain Filling & Harvesting', durationDays: '60-100 Days', activities: ['Harvest earheads when turn brown and dry'], fertilizers: ['Urea 15kg/acre top dress'], pestsAndDiseases: ['Stem Borer'] }
    ],
    advisory: 'Millet is highly drought tolerant; suitable for rainfed hilly districts.'
  },
  {
    crop: 'Sunflower',
    district: 'All',
    season: 'Rabi',
    sowingDate: 'November 01 - December 15',
    harvestDate: 'February 15 - March 20',
    durationMonths: 3.5,
    soilRequirement: 'Deep loamy soil with neutral pH.',
    seedRate: '3 kg hybrid seed/acre',
    stages: [
      { stageName: 'Sowing & Thinning', durationDays: '1-20 Days', activities: ['Maintain single plant per hill at 60x30 cm'], fertilizers: ['NPK 24:36:24 (DAP 75kg, MOP 40kg)'], pestsAndDiseases: ['Cutworms'] },
      { stageName: 'Button Stage & Flowering', durationDays: '35-65 Days', activities: ['Hand pollination / beehive placement'], fertilizers: ['Urea 25kg/acre top dress'], pestsAndDiseases: ['Head Rot'] },
      { stageName: 'Harvesting', durationDays: '90-105 Days', activities: ['Cut heads when back turns lemon yellow'], fertilizers: ['None'], pestsAndDiseases: ['Bird damage'] }
    ],
    advisory: 'Keep beehives near field during flowering to increase seed setting.'
  }
];

const seedData = async () => {
  await connectDB();

  const hashedPass = await bcrypt.hash('farmer123', 10);
  const adminPass = await bcrypt.hash('admin123', 10);
  const officerPass = await bcrypt.hash('officer123', 10);

  const sampleUsers = [
    { name: 'Ramesh Sahoo', email: 'farmer@odisha.gov.in', password: hashedPass, role: 'Farmer', district: 'Cuttack', phone: '9876543210' },
    { name: 'Dr. Anita Mohanty', email: 'officer@odisha.gov.in', password: officerPass, role: 'Agriculture Officer', district: 'Khordha', phone: '9876543211' },
    { name: 'Admin Odisha Ag', email: 'admin@odisha.gov.in', password: adminPass, role: 'Admin', district: 'Bhubaneswar', phone: '9876543212' }
  ];

  // Specific district crops + default templates
  const sampleCrops = [
    ...defaultCropTemplates,
    {
      crop: 'Paddy',
      district: 'Cuttack',
      season: 'Kharif',
      sowingDate: 'June 15 - July 15',
      harvestDate: 'October 25 - November 20',
      durationMonths: 4,
      soilRequirement: 'Clay loam to heavy clay soils with good water holding capacity',
      seedRate: '20-25 kg/acre for transplanting; 35-40 kg/acre for direct broadcasting',
      stages: defaultCropTemplates[0].stages,
      advisory: 'Ensure timely application of Neem coated urea to prevent nitrogen loss in heavy rainfall districts.'
    },
    {
      crop: 'Paddy',
      district: 'Bargarh',
      season: 'Rabi',
      sowingDate: 'December 01 - January 10',
      harvestDate: 'April 15 - May 10',
      durationMonths: 4.5,
      soilRequirement: 'Alluvial clay soil under canal irrigation',
      seedRate: '25 kg/acre',
      stages: [
        { stageName: 'Nursery & Sowing', durationDays: '1-25 Days', activities: ['Protect nursery from cold spell', 'Treat seed with Trichoderma viride'], fertilizers: ['FYM 5 tonnes/acre'], pestsAndDiseases: ['Seedling Blight'] },
        { stageName: 'Transplanting & Vegetative', durationDays: '26-65 Days', activities: ['Transplant in lined rows', 'Control early weeds'], fertilizers: ['DAP 50kg/acre, MOP 30kg/acre'], pestsAndDiseases: ['Stem Borer'] },
        { stageName: 'Harvesting', durationDays: '120-130 Days', activities: ['Mechanical combine harvesting', 'Moisture testing'], fertilizers: ['None'], pestsAndDiseases: ['None'] }
      ],
      advisory: 'Irrigate every 5-7 days from Hirakud canal supply.'
    },
    {
      crop: 'Vegetables',
      district: 'Puri',
      season: 'All',
      sowingDate: 'Year-Round (Kharif / Rabi / Zaid)',
      harvestDate: '60 - 90 Days post transplanting',
      durationMonths: 3,
      soilRequirement: 'Puri coastal sandy loam enriched with organic mulch.',
      seedRate: '150 - 250 grams/acre',
      stages: defaultCropTemplates[1].stages,
      advisory: 'Use saline-tolerant varieties in coastal Puri patches and provide drip fertigation.'
    }
  ];

  const sampleAdvisories = [
    {
      title: '🚨 High Pest Warning: Brown Plant Hopper (BPH) in Coastal Odisha',
      crop: 'Paddy',
      district: 'Cuttack',
      category: 'Pest Alert',
      description: 'BPH population observed exceeding threshold in low-land paddy fields due to persistent humidity. Drain standing water immediately and open air lanes.',
      severity: 'High',
      preventiveAction: 'Avoid excess nitrogen. Keep 30cm wide walkways every 2m.',
      chemicalTreatment: 'Spray Pymetrozine 50% WDG @ 120g/acre or Triflumezopyrim 10% SC @ 94ml/acre near base.',
      organicTreatment: 'Spray Neem seed kernel extract (NSKE 5%) @ 20ml/L water.',
      publishedBy: 'State Agriculture Dept., Odisha'
    },
    {
      title: '🌧️ Heavy Rainfall Advisory for Balasore & Bhadrak',
      crop: 'All',
      district: 'Balasore',
      category: 'Weather',
      description: 'Low pressure over Bay of Bengal likely to cause heavy rainfall (70-110 mm) in next 48 hours. Farmers are advised to clear field drainage channels.',
      severity: 'High',
      preventiveAction: 'Delay fertilizer and pesticide application until clear weather.',
      chemicalTreatment: 'N/A',
      organicTreatment: 'N/A',
      publishedBy: 'IMD & Odisha Ag Advisory Board'
    },
    {
      title: '🧪 Gypsum & Micronutrient Guidance for Groundnut',
      crop: 'Groundnut',
      district: 'Ganjam',
      category: 'Fertilizer',
      description: 'Apply Gypsum @ 100 kg/acre during flowering/pegging stage to prevent popping of pods and improve oil content.',
      severity: 'Medium',
      preventiveAction: 'Incorporate gypsum into soil near plant base followed by light irrigation.',
      chemicalTreatment: 'Gypsum 100kg/acre + Borax 4kg/acre',
      organicTreatment: 'Organic compost rich in calcium',
      publishedBy: 'Krishi Vigyan Kendra (KVK) Ganjam'
    }
  ];

  const sampleMarket = [
    { crop: 'Paddy (Common)', district: 'Cuttack', todayPrice: 2300, yesterdayPrice: 2250, trend: 'Up', mandi: 'Cuttack Central Mandi' },
    { crop: 'Paddy (Grade A)', district: 'Bargarh', todayPrice: 2450, yesterdayPrice: 2450, trend: 'Stable', mandi: 'Bargarh Grain Market' },
    { crop: 'Maize', district: 'Kalahandi', todayPrice: 2150, yesterdayPrice: 2200, trend: 'Down', mandi: 'Bhawanipatna Mandi' },
    { crop: 'Groundnut', district: 'Ganjam', todayPrice: 6550, yesterdayPrice: 6400, trend: 'Up', mandi: 'Berhampur APMC Market' },
    { crop: 'Mustard', district: 'Balasore', todayPrice: 5400, yesterdayPrice: 5350, trend: 'Up', mandi: 'Balasore APMC' },
    { crop: 'Green Gram', district: 'Nayagarh', todayPrice: 7800, yesterdayPrice: 7800, trend: 'Stable', mandi: 'Nayagarh Mandi' },
    { crop: 'Black Gram', district: 'Puri', todayPrice: 7400, yesterdayPrice: 7500, trend: 'Down', mandi: 'Nimapada APMC' },
    { crop: 'Cotton', district: 'Rayagada', todayPrice: 7100, yesterdayPrice: 7000, trend: 'Up', mandi: 'Gunupur Cotton Market' },
    { crop: 'Sugarcane', district: 'Dhenkanal', todayPrice: 350, yesterdayPrice: 350, trend: 'Stable', mandi: 'Dhenkanal Sugar Factory Yard' },
    { crop: 'Millet (Ragi)', district: 'Koraput', todayPrice: 4290, yesterdayPrice: 4200, trend: 'Up', mandi: 'Koraput Millet APMC' },
    { crop: 'Vegetables (Tomato)', district: 'Khordha', todayPrice: 1800, yesterdayPrice: 2000, trend: 'Down', mandi: 'Bhubaneswar Unit-1 Hat' },
    { crop: 'Vegetables', district: 'Puri', todayPrice: 2200, yesterdayPrice: 2150, trend: 'Up', mandi: 'Puri APMC Market' }
  ];

  if (isMock()) {
    console.log('🌱 Seeding mock memory database engine with comprehensive Odisha district crops...');
    mockStore.users = sampleUsers.map((u, i) => ({ _id: 'mock_usr_' + (i + 1), ...u, createdAt: new Date() }));
    mockStore.crops = sampleCrops.map((c, i) => ({ _id: 'mock_crop_' + (i + 1), ...c, createdAt: new Date() }));
    mockStore.advisories = sampleAdvisories.map((a, i) => ({ _id: 'mock_adv_' + (i + 1), ...a, createdAt: new Date() }));
    mockStore.market = sampleMarket.map((m, i) => ({ _id: 'mock_mkt_' + (i + 1), ...m, updatedAt: new Date() }));
    console.log('✅ Mock data seeded successfully with all crop templates!');
    return;
  }

  try {
    await User.deleteMany({});
    await Crop.deleteMany({});
    await Advisory.deleteMany({});
    await Market.deleteMany({});

    await User.insertMany(sampleUsers);
    await Crop.insertMany(sampleCrops);
    await Advisory.insertMany(sampleAdvisories);
    await Market.insertMany(sampleMarket);

    console.log('✅ MongoDB database seeded successfully!');
  } catch (e) {
    console.error('Error seeding DB:', e);
  }
};

if (require.main === module) {
  seedData().then(() => process.exit(0));
}

module.exports = seedData;
