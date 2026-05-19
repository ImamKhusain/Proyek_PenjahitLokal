import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import db from "../services/firebaseService";

import { AuthContext } from "../context/AuthContext";

import "./ChatPage.css";

const ChatPage = () => {
  const navigate = useNavigate();

  const { roomId } =
    useParams();

  const location =
    useLocation();

  const tailor =
    location.state?.tailor;

  const { user } =
    useContext(AuthContext);

  const [messages, setMessages] =
    useState([]);

  const [message, setMessage] =
    useState("");

  // STATE NAMA TAILOR
  const [tailorName, setTailorName] =
    useState("");

  // AMBIL TAILOR ID
  const tailorId =
    roomId?.split("_")[2];


  // =========================
  // FETCH DETAIL TAILOR
  // =========================

  useEffect(() => {

    const fetchTailor =
      async () => {

        try {

          const response =
            await axios.get(
              `http://localhost:8080/api/tailors/${tailorId}`
            );

          const data =
            response.data.data
              ? response.data.data
              : response.data;

          setTailorName(
            data.name
          );

        } catch (error) {

          console.log(
            "ERROR FETCH TAILOR:",
            error
          );

        }

      };

    if (tailorId) {
      fetchTailor();
    }

  }, [tailorId]);


  // =========================
  // REALTIME CHAT
  // =========================

  useEffect(() => {

    if (!roomId) return;

    const q = query(

      collection(
        db,
        "chats",
        roomId,
        "messages"
      ),

      orderBy(
        "created_at",
        "asc"
      )

    );

    const unsubscribe =
      onSnapshot(q, (snapshot) => {

        const chats =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setMessages(chats);

      });

    return () => unsubscribe();

  }, [roomId]);


  // =========================
  // SEND MESSAGE
  // =========================

  const sendMessage =
    async () => {

      if (!message.trim())
        return;

      try {

        await axios.post(

          "http://localhost:8080/api/chats/send",

          {
            tailor_id:
              tailor?.id ||
              tailorId,

            message,
          },

          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }

        );

        setMessage("");

      } catch (error) {

        console.log(
          "SEND ERROR:",
          error
        );

      }

    };


  return (

    <div className="chat-page">

      {/* HEADER MINIMALIS */}
      <div className="chat-header">

        <div className="chat-header-left">
          
          <button 
            className="chat-back-button" 
            onClick={() => navigate(-1)}
            title="Kembali"
          >
            ←
          </button>

          <div className="chat-user-info-block">

            <h2 className="chat-user-name">
              CS Admin ARKI
            </h2>

            {/* Menampilkan nama penjahit secara langsung tanpa embel-embel teks statis */}
            <p className="chat-tailor-context">
              {tailor?.name || tailorName || "Tailor"}
            </p>

          </div>

        </div>

      </div>


      {/* CHAT BODY */}

      <div className="chat-body">

        {messages.map((msg) => (

          <div
            key={msg.id}

            className={
              msg.sender_role ===
              "customer"
                ? "chat-bubble my-chat"
                : "chat-bubble other-chat"
            }
          >

            {msg.message}

          </div>

        ))}

      </div>


      {/* INPUT */}

      <div className="chat-input-area">

        <input
          type="text"

          placeholder="Ketik pesan..."

          value={message}

          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }

          onKeyDown={(e) => {

            if (e.key === "Enter") {
              sendMessage();
            }

          }}
        />

        <button
          onClick={sendMessage}
        >
          Kirim
        </button>

      </div>

    </div>

  );

};

export default ChatPage;