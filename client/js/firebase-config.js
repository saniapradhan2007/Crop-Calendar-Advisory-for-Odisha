/* ==========================================================================
   Firebase Configuration & Initialization - Odisha Crop Calendar & Advisory
   ========================================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyBZE9bKDS5cjvzUReNqJkUgZ_s7vL4KtVM",
  authDomain: "crop-calendar-and-advisory.firebaseapp.com",
  projectId: "crop-calendar-and-advisory",
  storageBucket: "crop-calendar-and-advisory.firebasestorage.app",
  messagingSenderId: "300952706649",
  appId: "1:300952706649:web:fb2f87ffd20ee33b81db48"
};

// Global Firebase Objects
let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;
let firebaseStorage = null;

if (typeof firebase !== 'undefined') {
  try {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    firebaseAuth = firebase.auth();
    firebaseDb = firebase.firestore();
    firebaseStorage = firebase.storage();
    console.log("🔥 Firebase initialized successfully for crop-calendar-and-advisory");
  } catch (err) {
    console.warn("Firebase initialization notice:", err.message);
  }
} else {
  console.log("Firebase config loaded. CDN SDKs ready for initialization.");
}
