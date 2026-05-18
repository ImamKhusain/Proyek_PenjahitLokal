const {
  getFirestore,
} = require("firebase/firestore");

const app =
  require("./firebase");


// CONNECT KE DATABASE NATIVE
const db =
  getFirestore(
    app,
    "penjahit-lokal"
  );

module.exports = db;