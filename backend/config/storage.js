const { getStorage } = require("firebase/storage");
const app = require("./firebase");

const storage = getStorage(app);

module.exports = storage;