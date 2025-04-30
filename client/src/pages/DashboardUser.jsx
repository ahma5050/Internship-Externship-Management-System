
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom'
import DashProfile from '../components/DashProfile';
import DashSidebasr from '../components/DashSidebasr';
import UserDashboard from '../components/UserDashboard';


import ProgressTracking from '../components/ProgressTracking';
import SearchOpporchinityPosted from '../components/SearchOpporchinityPosted';
import ApplayInter from './ApplayInter';
import GreadReport from '../components/GreadReport';
import AttendanceReport from '../components/AttendanceReport';
import ApprovedAttendance from './ApprovedAttendance';
import UserattendanceApp from '../components/UserattendanceApp';


const DashboardUser = () => {
  const Location=useLocation();
  const [tab, setTab]=useState("")
  useEffect(()=>{
    const UrlParams=new URLSearchParams(location.search)
    const paramsvalue=UrlParams.get("tab")
     setTab(paramsvalue)

  },[Location.search])
  console.log("uuuuuuuuuuuu", tab)
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
    {/* Sidebar - fixed width */}
    <div className="w-full md:w-64">
      <DashSidebasr />
    </div>
  
    {/* Main Content - take remaining width */}
    <div className="flex-1 p-4">
      {tab === "UserDashboard" && <UserDashboard />}
      {tab === "profile" && <DashProfile />}
      {tab === "applay" && <ApplayInter />}
      {tab === "search" && <SearchOpporchinityPosted />}
      {tab === "progress" && <ProgressTracking />}
      {tab === "attendance" && <AttendanceReport />}
      {tab === "gread" && <GreadReport />}
      {tab === "UserattendanceApp" && <UserattendanceApp />}
   
    </div>
  </div>
  
  )
}

export default DashboardUser