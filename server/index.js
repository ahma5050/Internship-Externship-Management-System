import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import path from "path";

import AuthRoute from './Routes/AuthRoute.js';
import attendanceRoute from './Routes/attendanceRoute.js';
import postRoute from './Routes/post.route.js';
import applicationRoute from './Routes/application.Route.js';
import advisorAssignmentRoute from './Routes/advisorAssignmentRoute.js';
import evaluationRoute from './Routes/evaluationRoute.js';
import chatRoutes from "./Routes/chatRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const url = process.env.url;

// ✅ Setup CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/postRoute", postRoute);
app.use("/api/attendanceRoute", attendanceRoute);
app.use('/api/AuthRoute', AuthRoute);
app.use('/api/applicationRoute', applicationRoute);
app.use('/api/advisorAssignmentRoute', advisorAssignmentRoute);
app.use('/api/evaluationRoute', evaluationRoute);
app.use("/api/chat", chatRoutes);
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

mongoose.connect(url)
  .then(() => console.log("the connection is created successfully !!"))
  .catch((err) => console.log("Connection failed:", err.message));

app.listen(PORT, () => {
  console.log(`the server is running on port ${PORT}`);
});

// Error handler
app.use((err, req, res, next) => {
  const StatusCode = err.StatusCode || 500;
  const message = err.message || "internal server error !!";
  res.status(StatusCode).json({ StatusCode, success: false, message });
});




//  i have installed helmet and morgan  & socket.io      

// import express from "express";
// import mongoose from "mongoose";
// import http from "http";
// import { Server } from "socket.io";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import path from "path";
// import multer from "multer";
// import helmet from "helmet";
// import cors from "cors";
// import morgan from "morgan";
// import AuthRoute from './Routes/AuthRoute.js';
// import attendanceRoute from './Routes/attendanceRoute.js';
// import postRoute from './Routes/post.route.js';
// import applicationRoute from './Routes/application.Route.js';
// import advisorAssignmentRoute from './Routes/advisorAssignmentRoute.js';
// import evaluationRoute from './Routes/evaluationRoute.js';
// import chatRoutes from "./Routes/chatRoutes.js";


// // Initialize app and environment
// dotenv.config();
// const app = express();
// const server = http.createServer(app);
// const PORT = process.env.PORT || 3000;
// const MONGODB_URI = process.env.url;

// // Socket.IO Configuration
// const io = new Server(server, {
//   cors: {
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//     methods: ["GET", "POST"]
//   },
//   pingTimeout: 60000 // Increase timeout for production
// });

// // Track active users and connections
// const userSocketMap = new Map(); // { userId: socketId }
// const activeConversations = new Map(); // { conversationId: Set<socketId> }

// io.on("connection", (socket) => {
//   console.log(`New connection: ${socket.id}`);

//   // User goes online
//   socket.on("userOnline", (userId) => {
//     userSocketMap.set(userId, socket.id);
//     console.log(`User ${userId} is now online`);
//     updateOnlineStatus();
//   });

//   // Join conversation room
//   socket.on("joinConversation", (conversationId) => {
//     socket.join(conversationId);
//     if (!activeConversations.has(conversationId)) {
//       activeConversations.set(conversationId, new Set());
//     }
//     activeConversations.get(conversationId).add(socket.id);
//     console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
//   });

//   // Leave conversation room
//   socket.on("leaveConversation", (conversationId) => {
//     socket.leave(conversationId);
//     if (activeConversations.has(conversationId)) {
//       activeConversations.get(conversationId).delete(socket.id);
//     }
//     console.log(`Socket ${socket.id} left conversation ${conversationId}`);
//   });

//   // Real-time messaging
//   socket.on("sendMessage", (message) => {
//     io.to(message.conversation).emit("newMessage", message);
//     console.log(`New message in conversation ${message.conversation}`);
//   });

//   // Typing indicators
//   socket.on("typing", ({ conversationId, userId }) => {
//     socket.to(conversationId).emit("userTyping", { userId });
//   });

//   socket.on("stoppedTyping", ({ conversationId, userId }) => {
//     socket.to(conversationId).emit("userStoppedTyping", { userId });
//   });

//   // Disconnection handler
//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
    
//     // Remove from userSocketMap
//     for (const [userId, socketId] of userSocketMap.entries()) {
//       if (socketId === socket.id) {
//         userSocketMap.delete(userId);
//         break;
//       }
//     }
    
//     // Remove from active conversations
//     for (const [conversationId, sockets] of activeConversations.entries()) {
//       if (sockets.has(socket.id)) {
//         sockets.delete(socket.id);
//       }
//     }
    
//     updateOnlineStatus();
//   });

//   function updateOnlineStatus() {
//     io.emit("onlineUsers", Array.from(userSocketMap.keys()));
//   }
// });

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(helmet());
// app.use(morgan("dev"));
// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials: true
// }));

// // File upload configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// export const upload = multer({ 
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
// });

// // Routes
//  app.use("/api/postRoute", postRoute)
// app.use("/api/attendanceRoute", attendanceRoute)
// app.use('/api/AuthRoute', AuthRoute);
// app.use('/api/applicationRoute', applicationRoute);
// app.use('/api/advisorAssignmentRoute', advisorAssignmentRoute);
// app.use('/api/evaluationRoute', evaluationRoute);
// app.use("/api/chat", chatRoutes);
// // Allow CORS headers for static uploads
// app.use('/uploads', (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
//   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }

//   next();
// }, express.static(path.join(path.resolve(), "uploads")));



// // Error handling middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal server error";
//   console.error(err);
//   res.status(statusCode).json({ success: false, message });
// });

// // Database connection and server start
// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     console.log("MongoDB connected successfully");
//     server.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error("MongoDB connection failed:", err.message);
//     process.exit(1);
//   });