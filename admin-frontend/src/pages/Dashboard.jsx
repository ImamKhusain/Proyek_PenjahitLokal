import { useEffect, useState }
from "react";

import { getMyTailor }
from "../services/tailorService";

import { getMyPortfolios }
from "../services/portfolioService";

const Dashboard = () => {

  const [tailor, setTailor] =
    useState(null);

  const [portfolios, setPortfolios] =
    useState([]);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const tailorData =
        await getMyTailor();

      setTailor(tailorData);

      const portfolioData =
        await getMyPortfolios(
          tailorData.id
        );

      setPortfolios(
        portfolioData
      );

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
            marginBottom: "30px",
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

          </div>

        )
      }

      <h2 style={{
        marginBottom: "20px",
      }}>
        Portfolio
      </h2>

      <div style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}>

        {
          portfolios.map((item) => (

            <div
              key={item.id}

              style={{
                width: "300px",
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 10px rgba(0,0,0,0.1)",
              }}
            >

              <img
                src={item.image_url}
                alt="portfolio"

                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <p style={{
                marginTop: "10px",
              }}>
                {item.description}
              </p>

            </div>

          ))
        }

      </div>

    </div>

  );

};

export default Dashboard;