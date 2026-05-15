import { useEffect, useState }
from "react";

import { getMyTailor }
from "../services/tailorService";

import { getMyPortfolios }
from "../services/portfolioService";

const ManagePortfolio = () => {

  const [portfolios, setPortfolios] =
    useState([]);

  useEffect(() => {

    fetchPortfolio();

  }, []);

  const fetchPortfolio =
    async () => {

      try {

        // ambil tailor login
        const tailor =
          await getMyTailor();

        console.log(tailor);

        // ambil portfolio sesuai tailor
        const data =
          await getMyPortfolios(
            tailor.id
          );

        console.log(data);

        setPortfolios(data);

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
        Manage Portfolio
      </h1>

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

export default ManagePortfolio;