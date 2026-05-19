  const bookingModel =
    require("../models/Booking");

  const User =
    require("../schema/User");

  const Tailor =
    require("../schema/Tailor");

  // GET ALL BOOKINGS
  const getAllBookings =
    async (req, res) => {

      try {

        const bookings =
          await bookingModel.findAll({

            include: [

              {
                model: User,
                as: "customer",

                attributes: [
                  "id",
                  "name",
                ],
              },

              {
                model: Tailor,
                as: "tailor",

                attributes: [
                  "id",
                  "name",
                ],
              },

            ],

            order: [
              ["id", "DESC"],
            ],

          });

        res.status(200).json({

          message:
            "Bookings retrieved successfully",

          data: bookings,

        });

      } catch (error) {

        res.status(500).json({

          message:
            "Error retrieving bookings",

          error: error.message,

        });

      }
    };

  // CREATE BOOKING
  const createBooking =
    async (req, res) => {

      try {

        const {
          customer_id,
          tailor_id,
          booking_date,
          body_size_note,
        } = req.body;

        const newBooking =
          await bookingModel.create({

            customer_id,
            tailor_id,
            booking_date,
            body_size_note,

          });

        res.status(201).json({

          message:
            "Booking created successfully",

          data: newBooking,

        });

      } catch (error) {

        res.status(400).json({

          message:
            "Error creating booking",

          error: error.message,

        });

      }
    };

  // GET BOOKING BY ID
  const getBookingById =
    async (req, res) => {

      try {

        const { id } =
          req.params;

        const booking =
          await bookingModel.findByPk(id, {

            include: [

              {
                model: User,
                as: "customer",

                attributes: [
                  "id",
                  "name",
                ],
              },

              {
                model: Tailor,
                as: "tailor",
                attributes: [
                  "id",
                  "name",
                ],
              },

            ],

          });

        if (!booking) {

          return res.status(404).json({

            message:
              "Booking not found",

          });
        }

        res.status(200).json({

          message:
            "Booking retrieved successfully",

          data: booking,

        });

      } catch (error) {

        res.status(500).json({

          message:
            "Error retrieving booking",

          error: error.message,

        });

      }
    };

  // UPDATE BOOKING
  const updateBooking =
    async (req, res) => {

      try {

        const { id } =
          req.params;

        const {
          booking_date,
          status,
          body_size_note,
        } = req.body;

        const booking =
          await bookingModel.findByPk(id);

        if (!booking) {

          return res.status(404).json({

            message:
              "Booking not found",

          });
        }

        await booking.update({

          booking_date,
          status,
          body_size_note,

        });

        res.status(200).json({

          message:
            "Booking updated successfully",

        });

      } catch (error) {

        res.status(500).json({

          message:
            "Error updating booking",

          error: error.message,

        });

      }
    };

  // DELETE BOOKING
  const deleteBooking =
    async (req, res) => {

      try {

        const { id } =
          req.params;

        const booking =
          await bookingModel.findByPk(id);

        if (!booking) {

          return res.status(404).json({

            message:
              "Booking not found",

          });
        }

        await booking.destroy();

        res.status(200).json({

          message:
            "Booking deleted successfully",

        });

      } catch (error) {

        res.status(500).json({

          message:
            "Error deleting booking",

          error: error.message,

        });

      }
    };

  module.exports = {

    getAllBookings,
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking,

  };