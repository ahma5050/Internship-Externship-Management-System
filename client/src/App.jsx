import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivetRoute from "./components/PrivetRoute";
import PrivetRouteForAdvisor from "./components/PrivetRouteForAdvisor";
import PrivetRouteforUset from "./components/PrivetRouteforUset";
import Footers from "./components/Footers";
import DashboardUser from "./pages/DashboardUser";
import DashboardAdvisor from "./pages/DashboardAdvisor";
import DashboardFaculty from "./pages/DashboardFaculty";
import Service from "./pages/Service";
import DashPosts from "./pages/DashPosts";
import UpdatePosts from "./pages/UpdatePosts";
import ApplayInter from "./pages/ApplayInter";
import ApprovedUser from "./pages/ApprovedUser";
import RejectedUser from "./pages/RejectedUser";
import ApprovedAttendance from "./pages/ApprovedAttendance";
import RejectedAttendance from "./pages/RejectedAttendance";
import ApprovedNormalUser from "./pages/ApprovedNormalUser";



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
        <Route element={<PrivetRoute />}>
        <Route path="/DashboardFaculty" element={<DashboardFaculty />} />
        </Route>
        <Route element={<PrivetRouteForAdvisor />}>
        <Route path="/DashboardAdvisor" element={<DashboardAdvisor />} />
        </Route>
        <Route element={<PrivetRouteforUset />}>
        <Route path="/DashboardUser" element={<DashboardUser />} />
        </Route>
        <Route path="/DashPosts" element={<DashPosts />} />
        <Route path="/UpdatePosts/:postId" element={<UpdatePosts />} />
        <Route path="/ApplayInter" element={<ApplayInter />} />
        <Route path="/ApprovedUser" element={<ApprovedUser />} />
        <Route path="/RejectedUser" element={<RejectedUser />} />
        <Route path="/ApprovedAttendance" element={<ApprovedAttendance />} />
        <Route path="/RejectedAttendance" element={<RejectedAttendance />} />
        <Route path="/ApprovedNormalUser" element={<ApprovedNormalUser />} />
        
      </Routes>
      <Footers />
    </BrowserRouter>
  );
};

export default App;
