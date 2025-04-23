import express from 'express';
import upload from "../middlewares/upload.js";
import { creatPost, deletePost, getPost, updatepost } from '../Controllers/post.controller.js';
import { verifyUser } from '../Utils/verifyUser.js';

const router = express.Router();
router.post("/creatPost", verifyUser, upload.single("profile"), creatPost);
router.get('/getPost', getPost);
router.delete("/deletePost/:postId/:userId", verifyUser, deletePost);
router.put("/updatepost/:postId/:userId",verifyUser, upload.single("profile"), updatepost);

export default router;