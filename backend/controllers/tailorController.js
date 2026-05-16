const tailorModel = require("../models/Tailor");

// GET ALL TAILORS
const getAllTailors = async (req, res) => {
  try {
    const tailors = await tailorModel.findAll();

    res.status(200).json({
      message: "Tailors retrieved successfully",
      data: tailors,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tailors",
      error: error.message,
    });
  }
};

// GET MY TAILOR
const getMyTailor = async (req, res) => {
  try {
    const tailor = await tailorModel.findByUserId(req.user.id);

    if (!tailor) {
      return res.status(404).json({
        message: "Tailor not found",
      });
    }

    res.status(200).json({
      message: "My tailor retrieved successfully",
      data: tailor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving my tailor",
      error: error.message,
    });
  }
};

// CREATE TAILOR
const createTailor = async (req, res) => {
  try {
    // TAMBAHAN: Ambil 'name' dari req.body
    const { name, specialization, description, address, phone } = req.body;

    // Siapkan wadah untuk data yang akan disimpan
    const tailorData = {
      user_id: req.user.id, // otomatis ambil user login
      name,                 // simpan nama
      specialization,
      description,
      address,
      phone,
    };

    // TAMBAHAN: Cek jika ada file foto yang di-upload lewat Multer
    if (req.file) {
      tailorData.photo = req.file.filename; // Simpan nama file-nya saja ke database
    }

    const newTailor = await tailorModel.create(tailorData);

    res.status(201).json({
      message: "Tailor created successfully",
      data: newTailor,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating tailor",
      error: error.message,
    });
  }
};

// GET TAILOR BY ID
const getTailorById = async (req, res) => {
  try {
    const { id } = req.params;
    const tailor = await tailorModel.findById(id);

    if (!tailor) {
      return res.status(404).json({
        message: "Tailor not found",
      });
    }

    res.status(200).json({
      message: "Tailor retrieved successfully",
      data: tailor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tailor",
      error: error.message,
    });
  }
};

// UPDATE TAILOR
const updateTailor = async (req, res) => {
  try {
    const { id } = req.params;
    
    // TAMBAHAN: Ambil 'name' dari req.body
    const { name, specialization, description, address, phone } = req.body;

    const tailor = await tailorModel.findById(id);

    if (!tailor) {
      return res.status(404).json({
        message: "Tailor not found",
      });
    }

    // Siapkan wadah untuk update data
    const updateData = {
      name, // update nama
      specialization,
      description,
      address,
      phone,
    };

    // TAMBAHAN: Cek jika user meng-upload foto baru saat update
    if (req.file) {
      updateData.photo = req.file.filename; 
    }

    await tailorModel.updateById(id, updateData);

    res.status(200).json({
      message: "Tailor updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating tailor",
      error: error.message,
    });
  }
};

// DELETE TAILOR
const deleteTailor = async (req, res) => {
  try {
    const { id } = req.params;
    const tailor = await tailorModel.findById(id);

    if (!tailor) {
      return res.status(404).json({
        message: "Tailor not found",
      });
    }

    await tailorModel.deleteById(id);

    res.status(200).json({
      message: "Tailor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting tailor",
      error: error.message,
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