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
} from "firebase/firestore";

import db from "../services/firebaseService";

const AdminChatRoom = () => {

  const { roomId } =
    useParams();

  const [messages, setMessages] =
    useState([]);

  const [message, setMessage] =
    useState("");

  // REALTIME LISTENER
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

  // SEND MESSAGE
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
          fontWeight: "700",
          fontSize: "22px",
          borderBottom:
            "1px solid #ddd",
        }}
      >
        Chat Admin
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