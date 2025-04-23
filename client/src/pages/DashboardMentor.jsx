
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom'
import DashProfile from '../components/DashProfile';
import DashSidebasr from '../components/DashSidebasr';
import MentorDashboard from '../components/MentorDashboard';
import ProgressMonitoring from '../components/ProgressMonitoring';
import CommunicationScheduling from '../components/CommunicationScheduling';
import MentorReportingAnalytics from '../components/mentorReportingAnalytics';




const DashboardMentor = () => {
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
    <div><DashSidebasr /></div>
    <div className=''>{tab==="MentorDashboard" && <MentorDashboard />}</div>
    <div className=''>{tab==="profile" && <DashProfile />}</div>
    <div className=''>{tab==="Monitoring" && <ProgressMonitoring />}</div>
    <div className=''>{tab==="Communication" && <CommunicationScheduling />}</div>
    <div className=''>{tab==="Reporting" && <MentorReportingAnalytics />}</div>


 
    </div>
  )
}

export default DashboardMentor