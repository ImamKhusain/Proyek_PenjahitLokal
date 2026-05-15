import { useEffect, useState }
from "react";

import { useNavigate }
from "react-router-dom";

import { getMyTailor }
from "../services/tailorService";

const Dashboard = () => {

  const navigate =
    useNavigate();

  const [tailor, setTailor] =
    useState(null);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const tailorData =
        await getMyTailor();

      setTailor(tailorData);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={{
      padding: "30px",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    }}>

      <h1 style={{
        marginBottom: "30px",
      }}>
        Dashboard Tailor
      </h1>

      {
        tailor && (

          <div style={{
            width: "400px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "0px 2px 10px rgba(0,0,0,0.1)",
          }}>

            <h2 style={{
              marginBottom: "20px",
            }}>
              {tailor.User.name}
            </h2>

            <p>
              <strong>
                Email:
              </strong>

              {" "}

              {tailor.User.email}
            </p>

            <p>
              <strong>
                Spesialisasi:
              </strong>

              {" "}

              {tailor.specialization}
            </p>

            <p>
              <strong>
                Deskripsi:
              </strong>

              {" "}

              {tailor.description}
            </p>

            <p>
              <strong>
                Alamat:
              </strong>

              {" "}

              {tailor.address}
            </p>

            <p>
              <strong>
                No HP:
              </strong>

              {" "}

              {tailor.phone}
            </p>

            <p>
              <strong>
                Rating:
              </strong>

              {" "}

              {tailor.rating}
            </p>

            <button
              onClick={() =>
                navigate(
                  "/manage-portfolio"
                )
              }

              style={{
                marginTop: "20px",
                padding:
                  "10px 20px",
                backgroundColor:
                  "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Manage Portfolio
            </button>

          </div>

        )
      }

    </div>

  );

};

export default Dashboard;