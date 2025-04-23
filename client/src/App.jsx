import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footers from "./components/Footers";
import DashboardUser from "./pages/DashboardUser";
import DashboardMentor from "./pages/DashboardMentor";
import DashboardFaculty from "./pages/DashboardFaculty";
import Service from "./pages/Service";
import DashPosts from "./pages/DashPosts";
import UpdatePosts from "./pages/UpdatePosts";
import ApplayInter from "./pages/ApplayInter";
import ApprovedUser from "./pages/ApprovedUser";
import RejectedUser from "./pages/RejectedUser";
import ApprovedAttendance from "./pages/ApprovedAttendance";
import RejectedAttendance from "./pages/RejectedAttendance";


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/About" element={<About />} />
        <Route path="/DashboardUser" element={<DashboardUser />} />
        <Route path="/DashboardMentor" element={<DashboardMentor />} />
        <Route path="/DashboardFaculty" element={<DashboardFaculty />} />
        <Route path="/DashPosts" element={<DashPosts />} />
        <Route path="/UpdatePosts/:postId" element={<UpdatePosts />} />
        <Route path="/ApplayInter" element={<ApplayInter />} />
        <Route path="/ApprovedUser" element={<ApprovedUser />} />
        <Route path="/RejectedUser" element={<RejectedUser />} />
        <Route path="/ApprovedAttendance" element={<ApprovedAttendance />} />
        <Route path="/RejectedAttendance" element={<RejectedAttendance />} />
        
      </Routes>
      <Footers />
    </BrowserRouter>
  );
};

export default App;
