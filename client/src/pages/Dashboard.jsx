import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom'
import DashProfile from '../components/DashProfile';
import DashSidebasr from '../components/DashSidebasr';
import ProgramsManagment from '../components/ProgramsManagment';
import Assigning from '../components/Assigning';
import ReportAnalytics from '../components/ReportAnalytics';
import AdminDashboard from '../components/AdminDashboard';
import ApprovedFacality from '../components/ApprovedFacality';
import ApprovedAdvisor from '../components/ApprovedAdvisor';
import ApprovedNormalUser from './ApprovedNormalUser';


const Dashboard = () => {
  const Location=useLocation();
  const [tab, setTab]=useState("")
  useEffect(()=>{
    const UrlParams=new URLSearchParams(location.search)
    const paramsvalue=UrlParams.get("tab")
     setTab(paramsvalue)

  },[Location.search])
  console.log("ppppppp", tab)
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
     <div className="w-full md:w-80 shadow-sm shadow-black/60 dark:border-none">
    <DashSidebasr />
    </div>
    <div className="flex-1 p-4 mx-5">
    <div className=''>{tab==="dash" && <AdminDashboard />}</div>
    <div className=''>{tab==="profile" && <DashProfile />}</div>
    <div className=''>{tab==="program" && <ProgramsManagment />}</div>
    <div className=''>{tab==="assign" && <Assigning />}</div>
    <div className=''>{tab==="report" && <ReportAnalytics />}</div>
    <div className=''>{tab==="ApprovedFacality" && <ApprovedFacality />}</div>
    <div className=''>{tab === "ApprovedAdvisor" && <ApprovedAdvisor />}</div>
    <div className=''>{tab === "ApprovedNormalUser" && <ApprovedNormalUser />}</div>
  
</div>
 
    </div>
  )
}

export default Dashboard