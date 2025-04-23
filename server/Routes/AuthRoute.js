// routes/auth.js
import express from "express";
import {
      SignUp,
      SignIn,
      UpdetUser,
      approveUser,
      getPendingFacultyByAdmin,
      getPendingFacuity,
    } from "../Controllers/AuthConteroller.js";
    
import upload from "../middlewares/upload.js";
import { verifyUser, verifyAdmin } from "../Utils/verifyUser.js";

const router = express.Router();

// Public
router.post("/signup", SignUp);
router.post("/signin", SignIn);

// Protected: any authenticated user can update their own profile
router.post(
  "/UpdetUser/:userId", 
  verifyUser,
  upload.single("profile"),
  UpdetUser
);

// Admin-only: list all pending users
router.get("/pending", verifyUser, getPendingFacultyByAdmin);

// Admin-only: approve a specific user
router.put("/approve/:id", verifyUser, verifyAdmin, approveUser);
router.get('/faculty-status/:facultyId', getPendingFacuity);

export default router;


//hwen you user call /signin signin called in controller the after login when user aske
//  protected route the verifyUser will be called to verify jwetoke of user to provided the recource
//after user login succesfully the all information including cookie cridential info set back to client and cookies stor to browther then For any future requests to protected routes, the client sends the JWT token back to the server in cookies (since it was stored in the browser's cookies).
//The browser sends cookies automatically with requests the verifyUser will be called to verify token then if valid it give access to requierd protected route with user cridential info in crbited in jwt
//thing it only cookie is set when user try to access to protected route 
