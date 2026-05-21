import {
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  AuthContext,
} from "../context/AuthContext";

const AdminPayments = () => {

  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useContext(
    AuthContext
  );

  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(true);

  const [payments, setPayments] =
    useState([]);

  useEffect(() => {

    if (!user) {

      navigate("/");
      return;

    }

    fetchPayments();

  }, [user]);

  // =========================
  // FETCH PAYMENTS
  // =========================

  const fetchPayments =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "http://localhost:8080/api/payments",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setPayments(
          response.data.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus =
    async (
      paymentId,
      newStatus
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(

          `http://localhost:8080/api/payments/${paymentId}`,

          {
            payment_status:
              newStatus,
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setPayments((prev) =>
          prev.map((item) =>
            item.id === paymentId
              ? {
                  ...item,
                  payment_status:
                    newStatus,
                }
              : item
          )
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f3f4f6",
        fontFamily:
          "Arial, sans-serif",
      }}
    >

      {/* SIDEBAR */}

      <Navbar
        isSidebarOpen={
          isSidebarOpen
        }

        setIsSidebarOpen={
          setIsSidebarOpen
        }

        logout={logout}

        navigate={navigate}
      />


      {/* MAIN */}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection:
            "column",
        }}
      >

        {/* TOPBAR */}

        <div
          style={{
            height: "60px",
            background:
              "#ffffff",
            borderBottom:
              "1px solid #e5e7eb",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            padding:
              "0 24px",
          }}
        >

          {/* MENU */}

          <div
            onClick={() =>
              setIsSidebarOpen(
                !isSidebarOpen
              )
            }

            style={{
              cursor: "pointer",
              fontSize: "20px",
              color: "#6b7280",
            }}
          >
            ☰
          </div>


          {/* RIGHT */}

          <div
            style={{
              fontWeight:
                "700",

              fontSize:
                "13px",

              color:
                "#111827",
            }}
          >
            ARKI
          </div>

        </div>


        {/* CONTENT */}

        <div
          style={{
            padding: "30px",
          }}
        >

          {/* HEADER */}

          <div
            style={{
              marginBottom: "30px",
            }}
          >

            <h1
              style={{
                fontSize: "42px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              Data Pembayaran
            </h1>

            <p
              style={{
                color: "#6b7280",
                fontSize: "16px",
              }}
            >
              Daftar pembayaran customer
            </p>

          </div>


          {/* GRID */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fill, minmax(350px, 1fr))",

              gap: "25px",
            }}
          >

            {payments.map((payment) => (

              <div
                key={payment.id}

                style={{
                  background:
                    "#ffffff",

                  borderRadius:
                    "20px",

                  overflow:
                    "hidden",

                  boxShadow:
                    "0 4px 14px rgba(0,0,0,0.05)",

                  border:
                    "1px solid #f1f1f1",
                }}
              >

                {/* IMAGE */}

                <div
                  style={{
                    width: "100%",
                    height: "240px",
                    background:
                      "#f9fafb",
                    overflow:
                      "hidden",
                  }}
                >

                  {payment.payment_proof ? (

                    <img
                      src={
                        payment.payment_proof
                      }

                      alt="payment"

                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit:
                          "cover",
                      }}
                    />

                  ) : (

                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        color: "#9ca3af",
                        fontWeight:
                          "600",
                      }}
                    >
                      Tidak ada bukti
                    </div>

                  )}

                </div>


                {/* BODY */}

                <div
                  style={{
                    padding: "22px",
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

                    {/* BOOKING */}

                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight:
                          "600",
                        color: "#4b5563",
                      }}
                    >
                      Booking ID :
                      {" "}

                      <span
                        style={{
                          color:
                            "#111827",

                          fontWeight:
                            "700",
                        }}
                      >
                        #{payment.booking_id}
                      </span>

                    </div>


                    {/* STATUS */}

                    <select

                      value={
                        payment.payment_status
                      }

                      onChange={(e) =>
                        updateStatus(
                          payment.id,
                          e.target.value
                        )
                      }

                      style={{

                        padding:
                          "12px 48px 12px 18px",

                        borderRadius:
                          "14px",

                        border: "none",

                        outline:
                          "none",

                        fontWeight:
                          "700",

                        fontSize:
                          "14px",

                        cursor:
                          "pointer",

                        transition:
                          "0.2s",

                        appearance:
                          "none",

                        WebkitAppearance:
                          "none",

                        MozAppearance:
                          "none",

                        backgroundColor:
                          payment.payment_status ===
                          "paid"
                            ? "#dcfce7"
                            : "#fef3c7",

                        color:
                          payment.payment_status ===
                          "paid"
                            ? "#166534"
                            : "#92400e",

                        boxShadow:
                          "0 4px 12px rgba(0,0,0,0.06)",

                        backgroundImage:
                          `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,

                        backgroundRepeat:
                          "no-repeat",

                        backgroundPosition:
                          "right 16px center",

                        backgroundSize:
                          "18px",

                        minWidth:
                          "140px",
                      }}
                    >

                      <option value="pending">
                        Pending
                      </option>

                      <option value="paid">
                        Paid
                      </option>

                    </select>

                  </div>


                  {/* METHOD */}

                  <h2
                    style={{
                      fontSize: "26px",
                      fontWeight:
                        "700",
                      color: "#111827",
                      marginBottom:
                        "16px",
                    }}
                  >
                    {
                      payment.payment_method
                    }
                  </h2>


                  {/* AMOUNT */}

                  <div>

                    <p
                      style={{
                        color: "#6b7280",
                        marginBottom:
                          "5px",
                        fontSize:
                          "15px",
                      }}
                    >
                      Total Pembayaran
                    </p>

                    <h3
                      style={{
                        fontSize: "30px",
                        color: "#16a34a",
                        fontWeight:
                          "700",
                      }}
                    >
                      Rp{" "}

                      {Number(
                        payment.amount
                      ).toLocaleString(
                        "id-ID"
                      )}
                    </h3>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );
};

export default AdminPayments;