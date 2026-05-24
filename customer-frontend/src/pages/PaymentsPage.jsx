import {
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";

import {
  AuthContext,
} from "../context/AuthContext";

const PaymentsPage = () => {

  const { user } =
    useContext(AuthContext);

  const [payments, setPayments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // =====================================
  // FETCH PAYMENTS
  // =====================================

  useEffect(() => {

    fetchPayments();

  }, []);


  const fetchPayments =
    async () => {

      try {

        const response =
          await axios.get(

            "https://proyek-penjahitlokal-764024000152.us-central1.run.app/api/payments",

            {
              headers: {
                Authorization:
                  `Bearer ${user.token}`,
              },
            }

          );


        setPayments(
          response.data.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

  };


  // =====================================
  // FORMAT RUPIAH
  // =====================================

  const formatRupiah =
    (number) => {

      return new Intl.NumberFormat(

        "id-ID",

        {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }

      ).format(number || 0);

  };


  // =====================================
  // STATUS COLOR
  // =====================================

  const getStatusColor =
    (status) => {

      if (status === "paid")
        return "#10b981";

      if (status === "rejected")
        return "#ef4444";

      return "#f59e0b";

  };


  if (loading) {

    return (

      <div
        style={{
          paddingTop: "150px",
          textAlign: "center",
        }}
      >

        <h2>
          Memuat pembayaran...
        </h2>

      </div>

    );

  }


  return (

    <div
      style={{
        padding:
          "140px 20px 40px 20px",

        background:
          "#f9fafb",

        minHeight:
          "100vh",

        fontFamily:
          "sans-serif",
      }}
    >

      <div
        style={{
          maxWidth:
            "1000px",

          margin:
            "0 auto",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            marginBottom:
              "30px",
          }}
        >

          <h1
            style={{
              marginBottom:
                "8px",
            }}
          >
            Histori Pembayaran
          </h1>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Pantau status pembayaran
            pesanan Anda secara realtime.
          </p>

        </div>


        {/* EMPTY */}

        {payments.length === 0 && (

          <div
            style={{
              background:
                "#ffffff",

              padding:
                "40px",

              borderRadius:
                "16px",

              textAlign:
                "center",
            }}
          >

            <h3>
              Belum ada pembayaran
            </h3>

          </div>

        )}


        {/* LIST */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >

          {payments.map((payment) => (

            <div
              key={payment.id}

              style={{
                background:
                  "#ffffff",

                borderRadius:
                  "18px",

                padding:
                  "24px",

                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >

              {/* TOP */}

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  marginBottom:
                    "20px",
                }}
              >

                <div>

                  <h2
                    style={{
                      margin: 0,
                    }}
                  >
                    Pembayaran
                    #{payment.id}
                  </h2>

                  <p
                    style={{
                      marginTop: "5px",
                      color: "#6b7280",
                    }}
                  >
                    Booking ID:
                    {" "}
                    {payment.booking_id}
                  </p>

                </div>


                {/* STATUS */}

                <div
                  style={{
                    background:
                      getStatusColor(
                        payment.payment_status
                      ),

                    color: "#fff",

                    padding:
                      "8px 16px",

                    borderRadius:
                      "999px",

                    fontWeight:
                      "700",

                    textTransform:
                      "capitalize",
                  }}
                >

                  {
                    payment.payment_status
                  }

                </div>

              </div>


              {/* DETAIL */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: "16px",
                }}
              >

                <div>

                  <p>
                    <strong>
                      Metode:
                    </strong>
                    {" "}
                    {
                      payment.payment_method
                    }
                  </p>

                  <p>
                    <strong>
                      Nominal:
                    </strong>
                    {" "}
                    {
                      formatRupiah(
                        payment.amount
                      )
                    }
                  </p>

                </div>


                <div>

                  <p>
                    <strong>
                      Tanggal:
                    </strong>
                    {" "}
                    {
                      new Date(
                        payment.created_at
                      ).toLocaleDateString(
                        "id-ID"
                      )
                    }
                  </p>

                </div>

              </div>


              {/* IMAGE */}

              {payment.payment_proof && (

                <div
                  style={{
                    marginTop:
                      "20px",
                  }}
                >

                  <img
                    src={
                      payment.payment_proof
                    }

                    alt="Bukti Pembayaran"

                    style={{
                      width: "100%",
                      maxWidth: "350px",
                      borderRadius: "14px",
                      border:
                        "1px solid #eee",
                    }}
                  />

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default PaymentsPage;