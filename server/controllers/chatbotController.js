// Agriculture knowledge base fallback engine for Odisha
const odishaAgriRules = [
  {
    keywords: ['sow', 'sowing', 'paddy', 'cuttack', 'time'],
    response: "🌾 **Paddy Sowing in Cuttack & Coastal Odisha:**\n- **Kharif Season:** Optimal sowing date is June 15 to July 15. Direct seeding or wet nursery preparation starts with early monsoon rains.\n- **Transplanting:** 21-25 days old seedlings should be transplanted in July/August with 20cm x 15cm spacing.\n- **Recommended Varieties:** Swarna, MTU 1010, Pooja, CR Dhan 307."
  },
  {
    keywords: ['urea', 'maize', 'fertilizer', 'quantity', 'dose'],
    response: "🧪 **Urea & Fertilizer Requirement for Maize (per Acre):**\n- **Total NPK:** 48 kg Nitrogen (approx. 105 kg Urea), 24 kg Phosphorus (150 kg SSP or 50 kg DAP), 24 kg Potash (40 kg MOP).\n- **Application Timing:**\n  1. Basal dose at sowing: 25% Urea + Full DAP/SSP + Full Potash.\n  2. Knee-high stage (25-30 days): 50% Urea top dressing.\n  3. Tasseling stage (45-50 days): Remaining 25% Urea."
  },
  {
    keywords: ['blast', 'disease', 'fungus', 'control', 'paddy'],
    response: "🛡️ **Control of Blast Disease in Paddy:**\n- **Symptoms:** Diamond-shaped spindle lesions on leaves with reddish-brown margins.\n- **Organic Treatment:** Spray Neem Oil (5ml/L water) or Pseudomonas fluorescens @ 10g/L water.\n- **Chemical Control:** Spray Tricyclazole 75% WP @ 0.6g/L water or Isoprothiolane 40% EC @ 1.5ml/L water upon first sign of symptoms."
  },
  {
    keywords: ['bph', 'brown plant hopper', 'pest', 'insect'],
    response: "🐜 **Brown Plant Hopper (BPH) Management:**\n- Avoid excess application of Nitrogenous fertilizers.\n- Maintain 30 cm alleyways every 2 meters for light & air circulation.\n- Spray **Triflumezopyrim 10% SC** @ 0.5 ml/L or **Pymetrozine 50% WDG** @ 0.6 g/L near crop base."
  },
  {
    keywords: ['kalia', 'scheme', 'government', 'subsidy'],
    response: "🏛️ **KALIA Scheme (Odisha Govt):**\n- Financial assistance of ₹10,000 per farmer family annually for Kharif & Rabi crop inputs.\n- Life insurance cover of ₹2 Lakh and interest-free crop loans up to ₹50,000."
  },
  {
    keywords: ['groundnut', 'bargarh', 'rabi', 'mustard'],
    response: "🥜 **Groundnut Cultivation in Bargarh & Western Odisha:**\n- Sowing Season: October-November (Rabi).\n- Seed Rate: 50-60 kg kernel per acre.\n- Gypsum Application: Apply 100 kg Gypsum per acre at 30-35 days stage (flowering/pegging) for kernel filling."
  }
];

exports.askChatbot = async (req, res) => {
  try {
    const { question, language } = req.body;
    if (!question) {
      return res.status(400).json({ success: false, message: 'Question prompt is required' });
    }

    const isOdia = language === 'or' || language === 'odia';
    const qLower = question.toLowerCase();

    // Check fallback knowledge base
    let matchedResponse = null;
    for (const rule of odishaAgriRules) {
      if (rule.keywords.some(kw => qLower.includes(kw))) {
        matchedResponse = rule.response;
        break;
      }
    }

    if (!matchedResponse) {
      matchedResponse = `🌾 **Odisha Krushi AI Advisory:**\n\nThank you for asking about "*${question}*".\n\nFor optimal crop performance in your district, ensure proper seed treatment with Carbendazim (2g/kg seed), follow balanced NPK fertilizer dosage based on your Soil Health Card, and maintain field drainage during rainy periods.\n\nYou can also check the **Crop Calendar** tab for detailed stage-by-stage instructions or view **Smart Advisories** for current pest warnings.`;
    }

    if (isOdia) {
      matchedResponse = `🌾 **ଓଡ଼ିଶା କୃଷି AI ପରାମର୍ଶ:**\n\nଆପଣଙ୍କ ପ୍ରଶ୍ନ "*${question}*" ପାଇଁ ସଠିକ୍ ପରାମର୍ଶ:\n\n` + matchedResponse;
    }

    res.json({
      success: true,
      answer: matchedResponse,
      timestamp: new Date()
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
