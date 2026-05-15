const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    // cek email
    const existingUser = await userModel.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Register success",
      data: newUser,
    });

  } catch (error) {

    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });

  }
};

// LOGIN
const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // cek user
    const user = await userModel.findByEmail(email);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // cek password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    // generate token
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

    res.status(200).json({
      message: "Login success",
      token,
      role: user.role,
    });

  } catch (error) {

    res.status(500).json({
      message: "Error login",
      error: error.message,
    });

  }
};

module.exports = {
  register,
  login,
};