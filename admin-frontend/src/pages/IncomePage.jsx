import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  getIncomeData,
} from "../services/incomeService";

const IncomePage = () => {

  const navigate =
    useNavigate();

  const {
    logout,
  } = useContext(
    AuthContext
  );

  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(true);

  const [
    payments,
    setPayments,
  ] = useState([]);

  const [
    totalIncome,
    setTotalIncome,
  ] = useState(0);

  const [
    loading,
    setLoading,
  ] = useState(true);


  // =====================================
  // FETCH INCOME
  // =====================================

  useEffect(() => {

    fetchIncome();

  }, []);


  const fetchIncome =
    async () => {

      try {

        const data =
          await getIncomeData();

        setPayments(
          data.payments
        );

        setTotalIncome(
          data.totalIncome
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div
        style={{

          display: "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          height: "100vh",

          fontSize:
            "20px",

          fontWeight:
            "700",

        }}
      >

        Loading...

      </div>

    );

  }


  return (

    <div
      style={{

        display: "flex",

        minHeight:
          "100vh",

        background:
          "#f3f4f6",

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


      {/* CONTENT */}

      <div
        style={{

          flex: 1,

          padding:
            "24px",

        }}
      >

        {/* TITLE */}

        <h1
          style={{

            fontSize:
              "32px",

            fontWeight:
              "800",

            marginBottom:
              "24px",

            color:
              "#111827",

          }}
        >

          Data Pemasukan

        </h1>


        {/* CARD TOTAL */}

        <div
          style={{

            background:
              "#2563eb",

            color:
              "#ffffff",

            borderRadius:
              "16px",

            padding:
              "28px",

            marginBottom:
              "28px",

            boxShadow:
              "0 8px 20px rgba(37,99,235,0.15)",

          }}
        >

          <div
            style={{

              fontSize:
                "15px",

              marginBottom:
                "10px",

              opacity: 0.9,

            }}
          >

            Total Pemasukan

          </div>

          <div
            style={{

              fontSize:
                "34px",

              fontWeight:
                "800",

            }}
          >

            Rp{" "}

            {Number(
              totalIncome
            ).toLocaleString(
              "id-ID"
            )}

          </div>

        </div>


        {/* TABLE */}

        <div
          style={{

            background:
              "#ffffff",

            borderRadius:
              "16px",

            overflow:
              "hidden",

            boxShadow:
              "0 4px 14px rgba(0,0,0,0.05)",

          }}
        >

          {/* HEADER */}

          <div
            style={{

              display: "grid",

              gridTemplateColumns:
                "1fr 1fr",

              padding:
                "16px 20px",

              background:
                "#eff6ff",

              fontWeight:
                "700",

              color:
                "#1e3a8a",

            }}
          >

            <div>
              Booking ID
            </div>

            <div>
              Nominal
            </div>

          </div>


          {/* DATA */}

          {payments.length >
          0 ? (

            payments.map(
              (item) => (

                <div
                  key={item.id}

                  style={{

                    display:
                      "grid",

                    gridTemplateColumns:
                      "1fr 1fr",

                    padding:
                      "16px 20px",

                    borderBottom:
                      "1px solid #f3f4f6",

                    alignItems:
                      "center",

                    fontSize:
                      "14px",

                  }}
                >

                  {/* BOOKING ID */}

                  <div>

                    #
                    {item.booking_id || "-"}

                  </div>

                  {/* NOMINAL */}

                  <div
                    style={{

                      fontWeight:
                        "700",

                      color:
                        "#111827",

                    }}
                  >

                    Rp{" "}

                    {Number(
                      item.amount || 0
                    ).toLocaleString(
                      "id-ID"
                    )}

                  </div>

                </div>

              )
            )

          ) : (

            <div
              style={{

                padding:
                  "40px",

                textAlign:
                  "center",

                color:
                  "#6b7280",

              }}
            >

              Belum ada pemasukan

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default IncomePage;