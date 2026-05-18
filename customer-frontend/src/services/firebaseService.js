import { initializeApp }
from "firebase/app";

import {
  initializeFirestore,
} from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSy...",

  authDomain:
    "b-07-489107.firebaseapp.com",

  projectId:
    "b-07-489107",

  storageBucket:
    "b-07-489107.firebasestorage.app",

  messagingSenderId:
    "764024000152",

  appId:
    "1:764024000152:web:6e13533470776ffb050aed",
};


// INIT APP
const app =
  initializeApp(firebaseConfig);


// ✅ FIX CHROME BLOCKED CLIENT
const db =
  initializeFirestore(
    app,
    {
      experimentalForceLongPolling: true,
      useFetchStreams: false,
    },
    "penjahit-lokal"
  );

export default db;