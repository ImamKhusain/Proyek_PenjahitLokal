const { getFirestore } = require("firebase/firestore");
const app = require("./firebase");

const db = getFirestore(app);

module.exports = db;