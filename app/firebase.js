// Import the functions you need from the SDKs you need
import { initializeApp ,getApp,getApps} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAOZkm_awhJCIzxunDJE2BQQ8dAIcjB1Bg",
  authDomain: "chatgenie-15f86.firebaseapp.com",
  projectId: "chatgenie-15f86",
  storageBucket: "chatgenie-15f86.appspot.com",
  messagingSenderId: "175467897774",
  appId: "1:175467897774:web:ec5501f5d3812fc3641e3f",
  measurementId: "G-2R6QGX7SG8"
};

// Initialize Firebase
const app = getApps().length ? getApp(): initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth();
export {auth, app}