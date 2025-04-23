// middleware/verify.js
import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";
import { ErrorHandler } from "../Utils/error.js";

// 1️⃣ Authenticate – verify token, load full user from DB
export const verifyUser = async (req, res, next) => {
  const token = req.cookies.mycookie;
  if (!token) {
    return next(ErrorHandler(401, "Not authenticated: no token provided"));
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    return next(ErrorHandler(401, "Invalid or expired token"));
  }

  // Optional but recommended: re‑fetch the user so you have freshest role/status
  const user = await UserModel.findById(payload.id).select("-password");
  if (!user) {
    return next(ErrorHandler(401, "User no longer exists"));
  }

  req.user = user;
  next();
};

// 2️⃣ Authorize – only allow admins whose account is approved
export const verifyAdmin = (req, res, next) => {
  // assume verifyUser ran first, so req.user is populated
  if (req.user.roles !== "Admin" || req.user.status !== "approved") {
    return next(ErrorHandler(403, "Admin access required"));
  }
  next();
};
