import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FiBell,
} from "react-icons/fi";

import Navbar from "../components/Navbar";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  getBookings,
  updateBookingStatus,
} from "../services/bookingService";

const BookingPage = () => {

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

  const [
    bookings,
    setBookings,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    if (!user) {

      navigate("/");
      return;
    }

    fetchBookings();

  }, [user]);

  // ======================
  // FETCH BOOKINGS
  // ======================

  const fetchBookings =
    async () => {

      try {

        setLoading(true);

        const data =
          await getBookings();

        setBookings(
          Array.isArray(data)
            ? data
            : data.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // ======================
  // UPDATE STATUS
  // ======================

  const handleUpdateStatus =
    async (
      id,
      status
    ) => {

      try {

        await updateBookingStatus(
          id,
          status
        );

        setBookings((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status,
                }
              : item
          )
        );

      } catch (error) {

        console.log(error);

        alert(
          "Gagal update status"
        );
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

          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: "14px",
            }}
          >

            <FiBell
              size={18}
              color="#111827"
            />

            <div
              style={{
                fontWeight:
                  "700",
                fontSize:
                  "13px",
              }}
            >
              ARKI
            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div
          style={{
            padding: "24px",
          }}
        >

          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight:
                "700",
              color: "#111827",
              marginBottom:
                "20px",
            }}
          >
            Daftar Pesanan
          </h1>

          {/* TABLE */}
          <div
            style={{
              background:
                "#ffffff",
              borderRadius:
                "14px",
              overflow:
                "hidden",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.04)",
            }}
          >

            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
              }}
            >

              <thead
                style={{
                  background:
                    "#f9fafb",
                }}
              >

                <tr>

                  <th style={thStyle}>
                    ID
                  </th>

                  <th style={thStyle}>
                    Customer
                  </th>

                  <th style={thStyle}>
                    Tailor
                  </th>

                  <th style={thStyle}>
                    Tanggal
                  </th>

                  <th style={thStyle}>
                    Status
                  </th>

                  <th style={thStyle}>
                    Catatan
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="6"
                      style={{
                        padding:
                          "20px",
                        textAlign:
                          "center",
                      }}
                    >
                      Memuat data...
                    </td>

                  </tr>

                ) : bookings.length >
                  0 ? (

                  bookings.map(
                    (item) => (

                      <tr
                        key={
                          item.id
                        }
                        style={{
                          borderTop:
                            "1px solid #f3f4f6",
                        }}
                      >

                        {/* ID */}
                        <td
                          style={
                            tdStyle
                          }
                        >
                          {
                            item.id
                          }
                        </td>

                        {/* CUSTOMER */}
                        <td
                          style={
                            tdStyle
                          }
                        >
                          {
                            item.customer?.name
                          }
                        </td>

                        {/* TAILOR */}
                        <td
                          style={
                            tdStyle
                          }
                        >
                          {
                            item.tailor?.name
                          }
                        </td>

                        {/* DATE */}
                        <td
                          style={
                            tdStyle
                          }
                        >
                          {
                            item.booking_date
                          }
                        </td>

                        {/* STATUS */}
                        <td
                          style={
                            tdStyle
                          }
                        >

                          <select
                            value={
                              item.status
                            }

                            onChange={(
                              e
                            ) =>
                              handleUpdateStatus(
                                item.id,
                                e.target
                                  .value
                              )
                            }

                            style={{
                              padding:
                                "8px 12px",

                              borderRadius:
                                "10px",

                              border:
                                "none",

                              fontWeight:
                                "700",

                              cursor:
                                "pointer",

                              outline:
                                "none",

                              background:
                                item.status ===
                                "pending"
                                  ? "#fef3c7"
                                  : item.status ===
                                    "accepted"
                                  ? "#dbeafe"
                                  : item.status ===
                                    "completed"
                                  ? "#dcfce7"
                                  : "#fee2e2",

                              color:
                                item.status ===
                                "pending"
                                  ? "#92400e"
                                  : item.status ===
                                    "accepted"
                                  ? "#1d4ed8"
                                  : item.status ===
                                    "completed"
                                  ? "#166534"
                                  : "#b91c1c",
                            }}
                          >

                            <option value="pending">
                              pending
                            </option>

                            <option value="accepted">
                              accepted
                            </option>

                            <option value="completed">
                              completed
                            </option>

                            <option value="cancelled">
                              cancelled
                            </option>

                          </select>

                        </td>

                        {/* CATATAN */}
                        <td
                          style={{
                            ...tdStyle,
                            maxWidth:
                              "400px",
                            lineHeight:
                              "22px",
                          }}
                        >
                          {
                            item.body_size_note
                          }
                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      style={{
                        padding:
                          "20px",
                        textAlign:
                          "center",
                      }}
                    >
                      Belum ada
                      pesanan
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

const thStyle = {

  padding: "16px",

  textAlign: "left",

  fontSize: "13px",

  fontWeight: "700",

  color: "#374151",
};

const tdStyle = {

  padding: "16px",

  fontSize: "14px",

  color: "#111827",
};

export default BookingPage;