// firebase project config
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPOUeieh-kzFiMtcJe42szn6WcLV004Ys",
  authDomain: "mentine-36224.firebaseapp.com",
  projectId: "mentine-36224",
  storageBucket: "mentine-36224.appspot.com",
  messagingSenderId: "744345937055",
  appId: "1:744345937055:web:829247ccfd136da2ff6eaa",
  measurementId: "G-RC5FKS2DD7"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };