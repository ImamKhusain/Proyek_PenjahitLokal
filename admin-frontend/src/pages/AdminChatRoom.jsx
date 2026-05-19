import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";

import axios from "axios";

import db from "../services/firebaseService";

const AdminChatRoom = () => {

  const { roomId } =
    useParams();

  const [messages, setMessages] =
    useState([]);

  const [message, setMessage] =
    useState("");

  // CUSTOMER NAME
  const [customerName, setCustomerName] =
    useState("");

  // TAILOR NAME
  const [tailorName, setTailorName] =
    useState("");


  // =========================
  // FETCH ROOM DETAIL
  // =========================

  useEffect(() => {

    const fetchRoom =
      async () => {

        try {

          const roomRef =
            doc(
              db,
              "chats",
              roomId
            );

          const roomSnap =
            await getDoc(roomRef);

          if (roomSnap.exists()) {

            const roomData =
              roomSnap.data();

            // CUSTOMER
            setCustomerName(
              roomData.customer_name ||
              `Customer #${roomData.customer_id}`
            );

            // FETCH TAILOR
            const response =
              await axios.get(
                `http://localhost:8080/api/tailors/${roomData.tailor_id}`
              );

            const tailorData =
              response.data.data
                ? response.data.data
                : response.data;

            setTailorName(
              tailorData.name
            );

          }

        } catch (error) {

          console.log(
            "ERROR FETCH ROOM:",
            error
          );

        }

      };

    if (roomId) {
      fetchRoom();
    }

  }, [roomId]);


  // =========================
  // REALTIME LISTENER
  // =========================

  useEffect(() => {

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

        const data =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setMessages(data);

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

      await addDoc(

        collection(
          db,
          "chats",
          roomId,
          "messages"
        ),

        {
          message,

          sender_id: 0,

          sender_role:
            "admin",

          created_at:
            serverTimestamp(),
        }

      );

      setMessage("");

    };


  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f3f4f6",
      }}
    >

      {/* HEADER */}
      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderBottom:
            "1px solid #ddd",

          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >

        {/* LEFT */}
        <div>

          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            {customerName}
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "#6b7280",
              marginTop: "4px",
            }}
          >
            Customer
          </div>

        </div>


        {/* RIGHT */}
        <div
          style={{
            textAlign: "right",
          }}
        >

          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            {tailorName}
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "#6b7280",
              marginTop: "4px",
            }}
          >
            Tailor
          </div>

        </div>

      </div>


      {/* BODY */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",

          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >

        {messages.map((msg) => (

          <div
            key={msg.id}

            style={{
              alignSelf:
                msg.sender_role ===
                "admin"
                  ? "flex-end"
                  : "flex-start",

              background:
                msg.sender_role ===
                "admin"
                  ? "#2563eb"
                  : "#ffffff",

              color:
                msg.sender_role ===
                "admin"
                  ? "#ffffff"
                  : "#111827",

              padding:
                "12px 16px",

              borderRadius:
                "14px",

              maxWidth: "70%",
            }}
          >
            {msg.message}
          </div>

        ))}

      </div>


      {/* INPUT */}
      <div
        style={{
          background: "#ffffff",
          padding: "16px",
          display: "flex",
          gap: "12px",
          borderTop:
            "1px solid #ddd",
        }}
      >

        <input
          type="text"

          value={message}

          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }

          placeholder="Ketik pesan..."

          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
          }}
        />

        <button
          onClick={sendMessage}

          style={{
            border: "none",
            background: "#2563eb",
            color: "#ffffff",
            padding: "0 22px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          Kirim
        </button>

      </div>

    </div>

  );

};

export default AdminChatRoom;