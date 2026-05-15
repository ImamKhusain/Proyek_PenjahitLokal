import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import TailorCard from "../components/TailorCard";

import { getAllTailors }
from "../services/tailorService";

import "../App.css";

const Home = () => {

  const [tailors, setTailors] =
    useState([]);

  useEffect(() => {

    fetchTailors();

  }, []);

  const fetchTailors = async () => {

    try {

      const data =
        await getAllTailors();

      setTailors(data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div>

      <Navbar />

      <div className="home-container">

        <h1>
          Daftar Penjahit
        </h1>

        <div className="tailor-list">

          {
            tailors.map((tailor) => (

              <TailorCard
                key={tailor.id}
                tailor={tailor}
              />

            ))
          }

        </div>

      </div>

    </div>
  );
};

export default Home;