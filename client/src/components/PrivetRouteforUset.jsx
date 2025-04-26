import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import UserDashboard from './UserDashboard';


const PrivetRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser.roles === "User" && currentUser.status === "pending") {
    // Show only faculty dashboard if faculty and still pending
    return <UserDashboard />;
  }

  // Otherwise, render the child route (Outlet)
  return <Outlet />;
}

export default PrivetRoute;