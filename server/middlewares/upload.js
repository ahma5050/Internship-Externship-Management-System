import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the uploads directory exists
const uploadDir = "uploads/";
//uploadDir is the varible contain reativpath or directory that image will be saved 
//it indicate current working directory (CWD). e.x your current directery is C:/home/project then uploadDir merg or add the given directory to current working directory  and refer it  C:/home/project/uploads/a.png 
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({ //multer is middleware user upload fileimage vedio and pdf to disk or localstorage or cloude
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Store images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter (accept only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png, gif) are allowed!"), false);
  }
};

// Upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;