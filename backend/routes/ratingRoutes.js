const express =
  require("express");

const router =
  express.Router();

const {

  getAllRatings,

  createRating,

  getRatingsByTailor,

  updateRating,

  deleteRating,

} = require(
  "../controllers/ratingController"
);

const authMiddleware =
  require("../middleware/authMiddleware");


// =====================================
// GET ALL RATINGS
// =====================================

router.get(
  "/",
  getAllRatings
);


// =====================================
// GET BY TAILOR
// =====================================

router.get(
  "/tailor/:tailorId",
  getRatingsByTailor
);


// =====================================
// CREATE RATING
// =====================================

router.post(

  "/",

  authMiddleware,

  createRating

);


// =====================================
// UPDATE RATING
// =====================================

router.put(

  "/:id",

  authMiddleware,

  updateRating

);


// =====================================
// DELETE RATING
// =====================================

router.delete(

  "/:id",

  authMiddleware,

  deleteRating

);

module.exports =
  router;