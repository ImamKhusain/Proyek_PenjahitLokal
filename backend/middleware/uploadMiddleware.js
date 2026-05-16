const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Tambahkan ini di paling atas untuk buat folder otomatis

// =========================================================================
// TAMBAHAN BARU: KHUSUS UNTUK CATALOG (MENYIMPAN KE UPLOADS/CATALOG)
// =========================================================================
const storageCatalog = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/catalog/";
    // Membuat folder 'uploads/catalog' otomatis jika belum ada
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Filter file image buat catalog (bisa pakai fungsi filter bawahnya atau bikin mandiri)
const fileFilterCatalog = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Instans multer khusus untuk catalog yang nanti dipanggil langsung
const uploadCatalog = multer({
  storage: storageCatalog,
  fileFilter: fileFilterCatalog,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});


// =========================================================================
// KODE LAMA TAILOR (SAMA SEKALI TIDAK DIGANGGU / DIUBAH)
// =========================================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only image files are allowed"),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// Triknya di sini: Tempelkan 'uploadCatalog' sebagai properti dari fungsi 'upload'
// Jadi cara 'module.exports = upload' milikmu tidak perlu dirubah/merusak route tailor lama!
upload.catalog = uploadCatalog;

module.exports = upload;