const firebaseService =
  require("../services/firebaseService");


// =====================================
// GET ALL RATINGS
// =====================================

const getAllRatings =
  async (req, res) => {

    try {

      const ratings =
        await firebaseService
          .getAllRatings();

      res.status(200).json({

        message:
          "Ratings retrieved successfully",

        data:
          ratings,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Error retrieving ratings",

        error:
          error.message,

      });

    }

};


// =====================================
// CREATE RATING
// =====================================

const createRating =
  async (req, res) => {

    try {

      const {

        tailor_id,

        rating,

        review,

      } = req.body;

      // =====================================
      // CUSTOMER LOGIN
      // =====================================

      const customer_id =
        req.user.id;


      // =====================================
      // CHECK DUPLICATE REVIEW
      // =====================================

      const alreadyReview =

        await firebaseService
          .checkExistingRating(

            customer_id,

            tailor_id

          );

      if (alreadyReview) {

        return res.status(400).json({

          message:
            "Anda sudah memberi review untuk penjahit ini",

        });

      }


      // =====================================
      // SAVE FIRESTORE
      // =====================================

      const newRating =
        await firebaseService
          .createRating({

            customer_id,

            tailor_id:
              Number(tailor_id),

            rating:
              Number(rating),

            review,

          });

      res.status(201).json({

        message:
          "Rating created successfully",

        data:
          newRating,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Error creating rating",

        error:
          error.message,

      });

    }

};


// =====================================
// GET RATINGS BY TAILOR
// =====================================

const getRatingsByTailor =
  async (req, res) => {

    try {

      const {
        tailorId,
      } = req.params;

      const ratings =
        await firebaseService
          .getRatingsByTailor(
            Number(tailorId)
          );

      res.status(200).json({

        message:
          "Ratings retrieved successfully",

        data:
          ratings,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Error retrieving ratings",

        error:
          error.message,

      });

    }

};


// =====================================
// UPDATE RATING
// =====================================

const updateRating =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {

        rating,

        review,

      } = req.body;

      await firebaseService
        .updateRating(

          id,

          {

            rating:
              Number(rating),

            review,

          }

        );

      res.status(200).json({

        message:
          "Rating updated successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Error updating rating",

        error:
          error.message,

      });

    }

};


// =====================================
// DELETE RATING
// =====================================

const deleteRating =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      await firebaseService
        .deleteRating(id);

      res.status(200).json({

        message:
          "Rating deleted successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Error deleting rating",

        error:
          error.message,

      });

    }

};

module.exports = {

  getAllRatings,

  createRating,

  getRatingsByTailor,

  updateRating,

  deleteRating,

};