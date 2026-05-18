const db = require("../config/firestore");

const {
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  query,
  orderBy,
} = require("firebase/firestore");


// ============================
// SEND MESSAGE
// ============================

exports.sendMessage = async (req, res) => {
  try {

    const { tailor_id, message } = req.body;

    const customer_id = req.user.id;

    const sender_role = req.user.role;

    if (!tailor_id || !message) {
      return res.status(400).json({
        success: false,
        message: "tailor_id dan message wajib diisi",
      });
    }

    // room id
    const roomId = `room_${customer_id}_${tailor_id}`;

    // room reference
    const roomRef = doc(db, "chats", roomId);

    // create/update room
    await setDoc(
      roomRef,
      {
        customer_id,
        tailor_id,
        last_message: message,
        last_sender_id: customer_id,
        updated_at: new Date(),
        created_at: new Date(),
      },
      { merge: true }
    );

    // messages collection
    const messagesRef = collection(
      db,
      "chats",
      roomId,
      "messages"
    );

    // add message
    await addDoc(messagesRef, {
      sender_id: customer_id,
      sender_role,
      message,
      created_at: new Date(),
      is_read: false,
    });

    return res.status(201).json({
      success: true,
      room_id: roomId,
      message: "Pesan berhasil dikirim",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// ============================
// GET MESSAGES
// ============================

exports.getMessages = async (req, res) => {
  try {

    const { roomId } = req.params;

    const messagesRef = collection(
      db,
      "chats",
      roomId,
      "messages"
    );

    const q = query(
      messagesRef,
      orderBy("created_at", "asc")
    );

    const snapshot = await getDocs(q);

    const messages = [];

    snapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return res.status(200).json({
      success: true,
      data: messages,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// ============================
// GET MY CHAT LIST
// ============================

exports.getMyChats = async (req, res) => {
  try {

    return res.status(200).json({
      success: true,
      message: "Belum dibuat",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};