import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebasr from "../components/DashSidebasr";
import AdvisorDashboard from "../components/AdvisorDashboard";
import ProgressMonitoring from "../components/ProgressMonitoring";
import CommunicationScheduling from "../components/CommunicationScheduling";
import AdvisorReportingAnalytics from "../components/AdvisorReportingAnalytics";


const DashboardAdvisor = () => {
  const Location = useLocation();
  const [tab, setTab] = useState("");
  
  useEffect(() => {
    const UrlParams = new URLSearchParams(Location.search);
    const paramsvalue = UrlParams.get("tab");
    setTab(paramsvalue);
  }, [Location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-72">
        <DashSidebasr />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 mx-5">
        {tab === "AdvisorDashboard" && <AdvisorDashboard />}
        {tab === "profile" && <DashProfile />}
        {tab === "Monitoring" && <ProgressMonitoring />}
        {tab === "Communication" && <CommunicationScheduling />}
        {tab === "Reporting" && <AdvisorReportingAnalytics />}
      </div>
    </div>
  );
};

export default DashboardAdvisor;