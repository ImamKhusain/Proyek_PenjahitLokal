const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ======================================================
// CATALOG UPLOAD (LOCAL)
// ======================================================

const storageCatalog = multer.diskStorage({
  destination: (req, file, cb) => {

    const dir = "uploads/catalog/";

    // buat folder otomatis
    if (!fs.existsSync(dir)) {

      fs.mkdirSync(dir, {
        recursive: true,
      });

    }

    cb(null, dir);

  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      "-" +
      file.originalname;

    cb(null, uniqueName);

  },
});

// ======================================================
// FILE FILTER
// ======================================================

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only image files are allowed"
      ),
      false
    );

  }

};

// ======================================================
// CATALOG MULTER
// ======================================================

const uploadCatalog = multer({
  storage: storageCatalog,

  fileFilter,

  limits: {
    fileSize:
      5 * 1024 * 1024,
  },
});

// ======================================================
// NORMAL LOCAL UPLOAD
// ======================================================

const storage =
  multer.diskStorage({

    destination: (
      req,
      file,
      cb
    ) => {

      const dir =
        "uploads/";

      // buat folder otomatis
      if (
        !fs.existsSync(dir)
      ) {

        fs.mkdirSync(dir, {
          recursive: true,
        });

      }

      cb(null, dir);

    },

    filename: (
      req,
      file,
      cb
    ) => {

      const uniqueName =
        Date.now() +
        "-" +
        file.originalname;

      cb(
        null,
        uniqueName
      );

    },

  });

// ======================================================
// LOCAL MULTER
// ======================================================

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize:
      5 * 1024 * 1024,
  },
});

// ======================================================
// FIREBASE / CLOUD STORAGE
// (sementara masih memory)
// ======================================================

const firebaseStorage =
  multer.memoryStorage();

const uploadFirebase =
  multer({

    storage:
      firebaseStorage,

    fileFilter,

    limits: {
      fileSize:
        5 * 1024 * 1024,
    },

  });

// ======================================================
// CUSTOM EXPORT
// ======================================================

// upload biasa
upload.catalog =
  uploadCatalog;

// upload firebase
upload.firebase =
  uploadFirebase;

module.exports =
  upload;