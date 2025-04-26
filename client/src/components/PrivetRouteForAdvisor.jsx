import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import AdvisorDashboard from './AdvisorDashboard';


const PrivetRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser.roles === "Advisor" && currentUser.status === "pending") {
    // Show only faculty dashboard if faculty and still pending
    return <AdvisorDashboard />;
  }

  // Otherwise, render the child route (Outlet)
  return <Outlet />;
}

export default PrivetRoute;