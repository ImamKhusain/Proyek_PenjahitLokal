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

    // AMBIL DATA USER
    const user =
      await User.findById(
        sender_id
      );

    if (!message) {

      return res.status(400).json({

        success: false,

        message:
          "message wajib diisi",

      });

    }


    // ============================
    // ROOM ID
    // ============================

    let realCustomerId;
    let adminId;
    let roomId;


    // ============================
    // CUSTOMER CHAT KE ADMIN
    // ============================

    if (
      sender_role ===
      "customer"
    ) {

      realCustomerId =
        sender_id;

      // AMBIL DATA TAILOR
      const tailorData =
        await Tailor.findById(
          tailor_id
        );

      // USER ADMIN
      adminId =
        tailorData.user_id;

      roomId =
        `room_${realCustomerId}_${adminId}`;

    }


    // ============================
    // ADMIN CHAT KE CUSTOMER
    // ============================

    else {

      realCustomerId =
        Number(customer_id);

      adminId =
        sender_id;

      roomId =
        `room_${realCustomerId}_${adminId}`;

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
          adminId,

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
    // CREATE NOTIFICATION
    // ============================

    // CUSTOMER CHAT
    // notif ke admin

    if (
      sender_role ===
      "customer"
    ) {

      await createChatNotification({

        user_id:
          adminId,

        sender_name:
          user.name,

        room_id:
          roomId,

      });

    }


    // ADMIN CHAT
    // notif ke customer

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