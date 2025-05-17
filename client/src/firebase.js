// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 
// Add other imports like Firestore, Storage, etc. as needed

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrzvR_KBQYlWuI8pBGJiTx6m_wBR62vKw",
  authDomain: "tasktrackr-b7b8d.firebaseapp.com",
  projectId: "tasktrackr-b7b8d",
  storageBucket: "tasktrackr-b7b8d.firebasestorage.app", // (❗This might be incorrect. See note below)
  messagingSenderId: "814005636008",
  appId: "1:814005636008:web:4b1d0e27aab36ffed1eb9d",
  measurementId: "G-DNQY1MK1T3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);               // ✅ Required for authentication
const analytics = getAnalytics(app);     // Optional (you can remove if not used)

// ✅ Export auth so you can import in other files
export { auth };
