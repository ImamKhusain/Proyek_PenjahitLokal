const userModel =
  require("../models/User");

// GET ALL USERS
const getAllUsers =
  async (req, res) => {

    try {

      const users =
        await userModel.findAll();

      res.status(200).json({
        message:
          "Users retrieved successfully",
        data: users,
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Error retrieving users",
        error: error.message,
      });

    }

};

module.exports = {
  getAllUsers,
};