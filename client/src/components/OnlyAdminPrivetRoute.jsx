import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const OnlyAdminPrivetRoute = () => {
      const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
{currentUser.roles==="Admin" ? <Outlet/> : <Navigate to="/SignIn"/>}
    </div>
  )
}

export default OnlyAdminPrivetRoute