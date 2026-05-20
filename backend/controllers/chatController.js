const db = require("../config/firestore");

const User =
  require("../models/User");

const Tailor =
  require("../models/Tailor");

const {
  createChatNotification,
} = require(
  "../services/notificationService"
);

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

exports.sendMessage = async (
  req,
  res
) => {

  try {

    const {
      tailor_id,
      message,
      customer_id,
      customer_name,
    } = req.body;

    const sender_id =
      req.user.id;

    const sender_role =
      req.user.role;

    // ============================
    // VALIDASI
    // ============================

    if (!message) {

      return res.status(400).json({

        success: false,

        message:
          "message wajib diisi",

      });

    }

    // ============================
    // AMBIL USER
    // ============================

    const user =
      await User.findById(
        sender_id
      );

    let realCustomerId;
    let realTailorId;
    let roomId;

    // ============================
    // CUSTOMER -> ADMIN
    // ============================

    if (
      sender_role ===
      "customer"
    ) {

      realCustomerId =
        sender_id;

      // PAKAI TAILOR ID LANGSUNG
      realTailorId =
        Number(tailor_id);

      roomId =
        `room_${realCustomerId}_${realTailorId}`;

    }

    // ============================
    // ADMIN -> CUSTOMER
    // ============================

    else {

      realCustomerId =
        Number(customer_id);

      // PAKAI TAILOR ID DARI FE
      realTailorId =
        Number(tailor_id);

      roomId =
        `room_${realCustomerId}_${realTailorId}`;

    }

    // ============================
    // ROOM REF
    // ============================

    const roomRef =
      doc(
        db,
        "chats",
        roomId
      );

    // ============================
    // CREATE / UPDATE ROOM
    // ============================

    await setDoc(

      roomRef,

      {

        customer_id:
          realCustomerId,

        customer_name:

          sender_role ===
          "customer"

            ? user.name

            : customer_name,

        tailor_id:
          realTailorId,

        last_message:
          message,

        last_sender_id:
          sender_id,

        updated_at:
          new Date(),

        created_at:
          new Date(),

        is_read: false,

      },

      {
        merge: true,
      }

    );

    // ============================
    // MESSAGE COLLECTION
    // ============================

    const messagesRef =
      collection(
        db,
        "chats",
        roomId,
        "messages"
      );

    // ============================
    // ADD MESSAGE
    // ============================

    await addDoc(

      messagesRef,

      {

        sender_id,

        sender_role,

        message,

        created_at:
          new Date(),

        is_read: false,

      }

    );

    // ============================
    // NOTIFICATION
    // ============================

    // CUSTOMER -> ADMIN
    if (
      sender_role ===
      "customer"
    ) {

      const tailorData =
        await Tailor.findById(
          realTailorId
        );

      await createChatNotification({

        user_id:
          tailorData.user_id,

        sender_name:
          user.name,

        room_id:
          roomId,

      });

    }

    // ADMIN -> CUSTOMER
    else {

      await createChatNotification({

        user_id:
          realCustomerId,

        sender_name:
          "Admin",

        room_id:
          roomId,

      });

    }

    return res.status(201).json({

      success: true,

      room_id:
        roomId,

      message:
        "Pesan berhasil dikirim",

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};


// ============================
// GET MESSAGES
// ============================

exports.getMessages = async (
  req,
  res
) => {

  try {

    const { roomId } =
      req.params;

    const messagesRef =
      collection(
        db,
        "chats",
        roomId,
        "messages"
      );

    const q = query(

      messagesRef,

      orderBy(
        "created_at",
        "asc"
      )

    );

    const snapshot =
      await getDocs(q);

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

      message:
        error.message,

    });

  }

};


// ============================
// GET MY CHAT LIST
// ============================

exports.getMyChats = async (
  req,
  res
) => {

  try {

    return res.status(200).json({

      success: true,

      message:
        "Belum dibuat",

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};