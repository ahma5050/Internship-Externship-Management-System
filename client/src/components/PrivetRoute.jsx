import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import FacultyDashboard from './FacultyDashboard' // or your actual file path

const PrivetRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser.roles === "Faculty" && currentUser.status === "pending") {
    // Show only faculty dashboard if faculty and still pending
    return <FacultyDashboard />;
  }

  // Otherwise, render the child route (Outlet)
  return <Outlet />;
}

export default PrivetRoute;
