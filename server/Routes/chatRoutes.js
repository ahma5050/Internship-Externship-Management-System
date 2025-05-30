import express from "express";
import { protect, authorize } from "../middlewares/authMiddlewares.js";
import {
  createConversation,
  getConversations,
  sendMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} from "../Controllers/chatController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Conversation routes
router.post(
  "/conversations",
  protect,
  authorize(["User", "Advisor"]),
  createConversation
);

router.get(
  "/conversations",
  protect,
  authorize(["User", "Advisor"]),
  getConversations
);

// Message routes
router.post(
  "/messages",
  protect,
  authorize(["User", "Advisor"]),
  upload.single("file"),  // Single file upload for messages
  (req, res, next) => {
    // Error handling for file upload
    if (req.file && req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ error: "File size exceeds 5MB limit." });
    }
    if (req.file && !["image/jpeg", "image/png", "image/gif"].includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Invalid file type. Only images are allowed." });
    }
    next();
  },
  sendMessage
);

router.get(
  "/messages/:conversationId",
  protect,
  authorize(["User", "Advisor"]),
  getMessages
);

router.put(
  "/messages/:messageId",
  protect,
  authorize(["User", "Advisor"]),
  updateMessage
);

router.delete(
  "/messages/:messageId",
  protect,
  authorize(["User", "Advisor"]),
  deleteMessage
);

export default router;
