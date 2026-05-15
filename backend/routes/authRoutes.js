const express = require("express");

const {
  registerCustomer,
  registerAdmin,
  login,
} = require("../controllers/authController");

const router = express.Router();

// REGISTER CUSTOMER
router.post(
  "/register-customer",
  registerCustomer
);

// REGISTER ADMIN
router.post(
  "/register-admin",
  registerAdmin
);

// LOGIN
router.post(
  "/login",
  login
);

module.exports = router;