
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom'
import DashProfile from '../components/DashProfile';
import DashSidebasr from '../components/DashSidebasr';
import FacultyDashboard from '../components/FacultyDashboard'; 
import GreadingActivity from '../components/GreadingActivity';
import GeneretReport from '../components/GeneretReport';
import InternshepPost from '../components/InternshepPost';
import ApprovalProcess from '../components/ApprovalProcess';
import AttendanceApproval from '../components/AttendanceApproval';




const DashboardFaculty = () => {
  const Location=useLocation();
  const [tab, setTab]=useState("")
  useEffect(()=>{
    const UrlParams=new URLSearchParams(location.search)
    const paramsvalue=UrlParams.get("tab")
     setTab(paramsvalue)

  },[Location.search])
  console.log("uuuuuuuuuuuu", tab)
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
     <div className="w-full md:w-64">
    <DashSidebasr />
    </div>
    <div className="flex-1 p-4 mx-5">
    <div className=''>{tab==="FacultyDashboard" && <FacultyDashboard />}</div>
    <div className='w-full'>{tab==="profile" && <DashProfile />}</div>
    <div className=''>{tab==="ApprovalProcess" && <ApprovalProcess />}</div>
    <div className='w-full'>{tab==="InternshepPost" && <InternshepPost />}</div>
    <div className=''>{tab==="GreadingActivity" && <GreadingActivity />}</div>
    <div className=''>{tab==="GeneretReport" && <GeneretReport />}</div>
    <div className=''>{tab==="Attenadpproval" && <AttendanceApproval />}</div>
</div>

 
    </div>
  )
}

export default DashboardFaculty