const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Save to 'uploads' folder
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname), // Unique filename
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Configure Multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
  fileFilter,
});

module.exports = { upload };
