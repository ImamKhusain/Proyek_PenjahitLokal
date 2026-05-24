import axios from "axios";

const API_URL =
  "https://proyek-penjahitlokal-764024000152.us-central1.run.app/api/payments";


// =====================================
// GET INCOME DATA
// =====================================

export const getIncomeData =
  async () => {

    try {

      // =====================================
      // AMBIL TOKEN LOGIN
      // =====================================

      const token =
        localStorage.getItem(
          "token"
        );

      // =====================================
      // REQUEST API
      // =====================================

      const response =
        await axios.get(

          API_URL,

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

      console.log(
        "PAYMENT RESPONSE:",
        response.data
      );

      // =====================================
      // AMBIL DATA PAYMENT
      // =====================================

      const allPayments =
        response.data.data || [];

      // =====================================
      // FILTER STATUS PAID
      // =====================================

      const paidPayments =

        allPayments.filter(
          (item) =>

            item.payment_status ===
            "paid"
        );

      // =====================================
      // TOTAL PEMASUKAN
      // =====================================

      const totalIncome =

        paidPayments.reduce(

          (
            total,
            item
          ) =>

            total +
            Number(
              item.amount || 0
            ),

          0
        );

      return {

        payments:
          paidPayments,

        totalIncome,

      };

    } catch (error) {

      console.log(
        "ERROR INCOME:",
        error
      );

      return {

        payments: [],

        totalIncome: 0,

      };

    }

  };