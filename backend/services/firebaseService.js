const app =
  require("../config/firebase");

const {

  getFirestore,

  collection,

  addDoc,

  getDocs,

  query,

  where,

  orderBy,

  serverTimestamp,

} = require(
  "firebase/firestore"
);

const {

  getStorage,

  ref,

  uploadBytes,

  getDownloadURL,

} = require(
  "firebase/storage"
);


// =====================================
// INITIALIZE
// =====================================

const db =
  getFirestore(
    app,
    "penjahit-lokal"
  );

const storage =
  getStorage(app);


// =====================================
// CHAT
// =====================================

const sendMessage =
  async ({

    booking_id,

    sender_id,

    receiver_id,

    sender_role,

    message,

  }) => {

    return await addDoc(

      collection(
        db,
        "chats"
      ),

      {

        booking_id,

        sender_id,

        receiver_id,

        sender_role,

        message,

        created_at:
          serverTimestamp(),

      }

    );

};


const getMessages =
  async (bookingId) => {

    const q = query(

      collection(
        db,
        "chats"
      ),

      where(
        "booking_id",
        "==",
        bookingId
      ),

      orderBy(
        "created_at",
        "asc"
      )

    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      (doc) => ({

        id: doc.id,

        ...doc.data(),

      })
    );

};


// =====================================
// PROGRESS
// =====================================

const addProgress =
  async ({

    booking_id,

    progress,

    description,

  }) => {

    return await addDoc(

      collection(
        db,
        "progress_updates"
      ),

      {

        booking_id,

        progress,

        description,

        created_at:
          serverTimestamp(),

      }

    );

};


// =====================================
// PAYMENT PROOF
// =====================================

const uploadPaymentProof =
  async (

    file,

    booking_id,

    customer_id

  ) => {

    try {

      const filename =

        `payment-proofs/` +

        `${Date.now()}-` +

        `${file.originalname}`;


      // STORAGE REF
      const storageRef =
        ref(storage, filename);


      // UPLOAD FILE
      await uploadBytes(
        storageRef,
        file.buffer
      );


      // GET URL
      const imageUrl =
        await getDownloadURL(
          storageRef
        );


      // SAVE FIRESTORE
      const paymentDoc =
        await addDoc(

          collection(
            db,
            "payment_proofs"
          ),

          {

            booking_id,

            customer_id,

            image_url:
              imageUrl,

            status:
              "pending",

            created_at:
              serverTimestamp(),

          }

        );


      return {

        id:
          paymentDoc.id,

        imageurl:
          imageUrl,

      };

    } catch (error) {

      console.log(error);

      throw error;

    }

};


// =====================================
// SAVE PAYMENT TO FIRESTORE
// =====================================

const savePaymentToFirestore =
  async (paymentData) => {

    return await addDoc(

      collection(
        db,
        "payment_proofs"
      ),

      {

        ...paymentData,

        created_at:
          serverTimestamp(),

      }

    );

};


// =====================================
// NOTIFICATION
// =====================================

const addNotification =
  async ({

    user_id,

    title,

    message,

  }) => {

    return await addDoc(

      collection(
        db,
        "notifications"
      ),

      {

        user_id,

        title,

        message,

        is_read:
          false,

        created_at:
          serverTimestamp(),

      }

    );

};


// =====================================
// EXPORT
// =====================================

module.exports = {

  db,

  storage,

  sendMessage,

  getMessages,

  addProgress,

  uploadPaymentProof,

  savePaymentToFirestore,

  addNotification,

};