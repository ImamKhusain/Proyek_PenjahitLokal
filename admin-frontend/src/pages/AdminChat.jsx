import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import {
  useNavigate,
} from "react-router-dom";

import db from "../services/firebaseService";

const AdminChat = () => {

  const navigate =
    useNavigate();

  const [rooms, setRooms] =
    useState([]);

  useEffect(() => {

    const q = query(
      collection(db, "chats"),
      orderBy("updated_at", "desc")
    );

    const unsubscribe =
      onSnapshot(q, (snapshot) => {

        const data =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setRooms(data);

      });

    return () => unsubscribe();

  }, []);

  return (

    <div
      style={{
        padding: "30px",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >

      <h1
        style={{
          fontSize: "30px",
          fontWeight: "700",
          marginBottom: "25px",
        }}
      >
        Chat Customer
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >

        {rooms.map((room) => (

          <div
            key={room.id}

            onClick={() =>
              navigate(
                `/admin-chat/${room.id}`
              )
            }

            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "18px 20px",
              cursor: "pointer",

              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              boxShadow:
                "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >

            {/* LEFT */}
            <div>

 <div
  style={{
    fontWeight: "700",
    fontSize: "17px",
    marginBottom: "6px",
  }}
>
  {
    room.customer_name ||
    `Customer #${room.customer_id}`
  }
</div>

              <div
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                {room.last_message}
              </div>

            </div>

            {/* RIGHT */}
            <div
              style={{
                color: "#9ca3af",
                fontSize: "13px",
              }}
            >
              Buka Chat →
            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default AdminChat;