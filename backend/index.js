const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");

// IMPORT SCHEMA
require("./schema/User");
require("./schema/Tailor");
require("./schema/Booking");
require("./schema/Portfolio");
require("./schema/Payment");
require("./schema/Rating");

// IMPORT ROUTES
const authRoutes = require("./routes/authRoutes");
const tailorRoutes = require("./routes/tailorRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const ratingRoutes = require("./routes/ratingRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/tailors", tailorRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/ratings", ratingRoutes);

// ROOT
app.get("/", (req, res) => {
  res.send("API Penjahit Lokal Running");
});

// DATABASE CONNECTION
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");

    return sequelize.sync();
  })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.log("Database error:", err);
  });

// SERVER
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});