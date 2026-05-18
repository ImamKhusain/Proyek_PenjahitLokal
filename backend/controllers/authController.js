const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =========================
// REGISTER CUSTOMER
// =========================

const registerCustomer = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await userModel.findByEmail(email);

    if (existingUser) {

      return res.status(400).json({
        message:
          "Email already registered",
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser =
      await userModel.create({

        name,

        email,

        password:
          hashedPassword,

        role: "customer",
      });

    res.status(201).json({

      message:
        "Customer registered successfully",

      data: newUser,
    });

  } catch (error) {

    res.status(500).json({

      message:
        "Error register customer",

      error: error.message,
    });

  }
};


// =========================
// REGISTER ADMIN / PENJAHIT
// =========================

const registerAdmin = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await userModel.findByEmail(email);

    if (existingUser) {

      return res.status(400).json({
        message:
          "Email already registered",
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser =
      await userModel.create({

        name,

        email,

        password:
          hashedPassword,

        role: "admin",
      });

    res.status(201).json({

      message:
        "Admin registered successfully",

      data: newUser,
    });

  } catch (error) {

    res.status(500).json({

      message:
        "Error register admin",

      error: error.message,
    });

  }
};


// =========================
// LOGIN
// =========================

const login = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await userModel.findByEmail(email);

    if (!user) {

      return res.status(404).json({
        message:
          "User not found",
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Wrong password",
      });

    }

    // JWT TOKEN
    const token = jwt.sign(

      {
        id: user.id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      }

    );


    // =========================
    // RESPONSE LOGIN
    // =========================

    res.status(200).json({

      message:
        "Login success",

      token,

      role: user.role,

      // ✅ TAMBAHAN INI
      id: user.id,

      name: user.name,

    });

  } catch (error) {

    res.status(500).json({

      message:
        "Error login",

      error: error.message,
    });

  }
};


module.exports = {

  registerCustomer,

  registerAdmin,

  login,

};