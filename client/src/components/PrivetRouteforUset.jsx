import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import UserDashboard from './UserDashboard';

const PrivetRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser?.roles === "User" && currentUser?.userStatus === "pending") {
    return <UserDashboard />;
  }

  return <Outlet />;
}

export default PrivetRoute;
