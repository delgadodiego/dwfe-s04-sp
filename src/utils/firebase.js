import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnG3SZvS0QRb_8QIDj0X1QgL2EE3B1KjQ",
  authDomain: "dd-dwfe-s04-sp.firebaseapp.com",
  projectId: "dd-dwfe-s04-sp",
  storageBucket: "dd-dwfe-s04-sp.appspot.com",
  messagingSenderId: "1053156128982",
  appId: "1:1053156128982:web:57412b8dffee1dac09f177",
  measurementId: "G-FTCD74VX4G",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
