import multer from "multer";
import path from "path";
import fs from "fs";

// Define accepted MIME types for each type condition
const acceptedMimeTypes = {
  document: null, // Accepts all MIME types (no filter needed)
  "photos-videos": [
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/avi",
    "video/mov",
    "video/3gp",
    "video/webm",
  ],
  audio: ["audio/mpeg", "audio/wav", "audio/amr", "audio/mp3", "audio/webm"],
};

// Function to ensure directory exists
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Custom file filter function with conditional MIME type validation
function fileFilter(req, file, cb) {
  const fileType = req.body.type;

  // Check if fileType is valid and corresponds to acceptedMimeTypes
  if (acceptedMimeTypes.hasOwnProperty(fileType)) {
    const allowedMimeTypes = acceptedMimeTypes[fileType];

    if (!allowedMimeTypes || allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error(`Unsupported file type for '${fileType}'`), false); // Reject the file
    }
  } else {
    cb(new Error(`Invalid file type '${fileType}'`), false); // Reject the file
  }
}

// Multer storage configurations
const storageForTasks = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./server/uploads/tasks/";
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const storageForChatDocuments = multer.diskStorage({
  destination: function (req, file, cb) {
    const chat_name = req.body.chat_name;
    if (!chat_name) {
      return cb(new Error("chat_name not provided in request body"), null);
    }
    const uploadPath = `./server/uploads/chat/${chat_name}/${req.body.type}/`;
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer upload configurations with conditional file filter
export const uploadForTasks = multer({
  storage: storageForTasks,
  // fileFilter: fileFilter,
});

export const uploadForChatFile = multer({
  storage: storageForChatDocuments,
  fileFilter: fileFilter,
});
