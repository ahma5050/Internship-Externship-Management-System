import express from "express";
import mongoose from "mongoose";
import  AuthRoute from './Routes/AuthRoute.js'
import  attendanceRoute from './Routes/attendanceRoute.js'
import postRoute from './Routes/post.route.js'
import applicationRoute from './Routes/application.Route.js'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import path from "path";


const app=express();
dotenv.config();
const PORT=process.env.PORT || 5000;
const url=process.env.url;
app.use(express.json())
app.use(cookieParser()) // It extracts cookies from the request headers and makes them available in req.cookies
app.use("/api/postRoute", postRoute)
app.use("/api/attendanceRoute", attendanceRoute)
app.use('/api/AuthRoute', AuthRoute);
app.use('/api/applicationRoute', applicationRoute);
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));


app.listen(PORT, ()=>{console.log(`the server is runing ${PORT}`)});
mongoose.connect(url)
.then(()=>console.log("the connection is created successfully !!"))
.catch((err) => console.log("Connection failed:", err.message));


app.use((err, req, res, next)=>{
const StatusCode=err.StatusCode || 500;
const message=err.message || "enternal server error !!"
res.status(StatusCode).json({StatusCode, succes:false, message});
})

