const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "b-07-489107.firebaseapp.com",
  projectId: "b-07-489107",
  storageBucket: "b-07-489107.firebasestorage.app",
  messagingSenderId: "764024000152",
  appId: "1:764024000152:web:6e13533470776ffb050aed",
};

const app = initializeApp(firebaseConfig);

module.exports = app;