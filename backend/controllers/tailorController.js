const tailorModel =
  require("../models/Tailor");

const firebaseService =
  require("../services/firebaseService");


// =====================================
// GET ALL TAILORS
// =====================================

const getAllTailors =
  async (req, res) => {

    try {

      const tailors =
        await tailorModel.findAll();

      res.status(200).json({

        message:
          "Tailors retrieved successfully",

        data:
          tailors,

      });

    } catch (error) {

      res.status(500).json({

        message:
          "Error retrieving tailors",

        error:
          error.message,

      });

    }

};


// =====================================
// GET MY TAILOR
// =====================================

const getMyTailor =
  async (req, res) => {

    try {

      const tailors =
        await tailorModel.findByUserId(
          req.user.id
        );

      if (
        !tailors ||
        tailors.length === 0
      ) {

        return res.status(404).json({

          message:
            "Belum ada profil penjahit",

          data: [],

        });

      }

      res.status(200).json({

        message:
          "My tailors retrieved successfully",

        data:
          tailors,

      });

    } catch (error) {

      res.status(500).json({

        message:
          "Error retrieving my tailors",

        error:
          error.message,

      });

    }

};


// =====================================
// CREATE TAILOR
// =====================================

const createTailor =
  async (req, res) => {

    try {

      const {

        name,

        specialization,

        description,

        address,

        phone,

      } = req.body;

      // =====================================
      // DATA
      // =====================================

      const tailorData = {

        user_id:
          req.user.id,

        name,

        specialization,

        description,

        address,

        phone,

      };

      // =====================================
      // FIREBASE UPLOAD
      // =====================================

      if (req.file) {

        const uploadResult =
          await firebaseService
            .uploadTailorImage(
              req.file
            );

        tailorData.photo =
          uploadResult.imageurl;

      }

      // =====================================
      // MYSQL
      // =====================================

      const newTailor =
        await tailorModel.create(
          tailorData
        );

      res.status(201).json({

        message:
          "Tailor created successfully",

        data:
          newTailor,

      });

    } catch (error) {

      console.log(error);

      res.status(400).json({

        message:
          "Error creating tailor",

        error:
          error.message,

      });

    }

};


// =====================================
// GET TAILOR BY ID
// =====================================

const getTailorById =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const tailor =
        await tailorModel.findById(
          id
        );

      if (!tailor) {

        return res.status(404).json({

          message:
            "Tailor not found",

        });

      }

      res.status(200).json({

        message:
          "Tailor retrieved successfully",

        data:
          tailor,

      });

    } catch (error) {

      res.status(500).json({

        message:
          "Error retrieving tailor",

        error:
          error.message,

      });

    }

};


// =====================================
// UPDATE TAILOR
// =====================================

const updateTailor =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {

        name,

        specialization,

        description,

        address,

        phone,

      } = req.body;

      const tailor =
        await tailorModel.findById(
          id
        );

      if (!tailor) {

        return res.status(404).json({

          message:
            "Tailor not found",

        });

      }

      // =====================================
      // UPDATE DATA
      // =====================================

      const updateData = {

        name,

        specialization,

        description,

        address,

        phone,

      };

      // =====================================
      // FIREBASE UPLOAD
      // =====================================

      if (req.file) {

        const uploadResult =
          await firebaseService
            .uploadTailorImage(
              req.file
            );

        updateData.photo =
          uploadResult.imageurl;

      }

      // =====================================
      // MYSQL UPDATE
      // =====================================

      await tailorModel.updateById(
        id,
        updateData
      );

      res.status(200).json({

        message:
          "Tailor updated successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Error updating tailor",

        error:
          error.message,

      });

    }

};


// =====================================
// DELETE TAILOR
// =====================================

const deleteTailor =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const tailor =
        await tailorModel.findById(
          id
        );

      if (!tailor) {

        return res.status(404).json({

          message:
            "Tailor not found",

        });

      }

      await tailorModel.deleteById(
        id
      );

      res.status(200).json({

        message:
          "Tailor deleted successfully",

      });

    } catch (error) {

      res.status(500).json({

        message:
          "Error deleting tailor",

        error:
          error.message,

      });

    }

};

module.exports = {

  getAllTailors,

  getMyTailor,

  createTailor,

  getTailorById,

  updateTailor,

  deleteTailor,

};