import {
  useEffect,
  useState,
  useContext,
} from "react";

import { useNavigate }
from "react-router-dom";

import {
  AuthContext
} from "../context/AuthContext";

import Navbar
from "../components/Navbar";

import TailorCard
from "../components/TailorCard";

import { getAllTailors }
from "../services/tailorService";

import "../App.css";

const Home = () => {

  const navigate =
    useNavigate();

  const {
    user,
    logout
  } = useContext(AuthContext);

  const [tailors, setTailors] =
    useState([]);

  useEffect(() => {

    // CEK LOGIN
    if (!user) {

      navigate("/");

      return;

    }

    fetchTailors();

  }, [user]);

  const fetchTailors =
    async () => {

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

        <div style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}>

          <h1>
            Daftar Penjahit
          </h1>

          <button
            onClick={() => {

              logout();

              navigate("/");

            }}

            style={{
              padding:
                "10px 20px",
              backgroundColor:
                "red",
              color: "white",
              border: "none",
              borderRadius:
                "8px",
              cursor: "pointer",
              fontWeight:
                "bold",
            }}
          >
            Logout
          </button>

        </div>

        <div className="tailor-list">

          {
            tailors.map(
              (tailor) => (

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