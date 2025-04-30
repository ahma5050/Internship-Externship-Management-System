import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { ThemContext } from '../context/ThemContext';
import { FaUserCheck } from 'react-icons/fa';

const UserNormalpending = () => {
  const { darkMode } = useContext(ThemContext);
  const { currentUser } = useSelector((state) => state.user);
  const [userStatus, setUserStatus] = useState('');

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const res = await fetch(`/api/AuthRoute/get-user-status/${currentUser._id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch user status");
        setUserStatus(data.userStatus);
      } catch (error) {
        console.error(error);
      } 
    };

    if (currentUser?._id) {
      fetchUserStatus();
    }
  }, [currentUser]);

 

  return (
    <div className="flex flex-col h-auto text-center  pt-4">
      {currentUser?.userStatus === "pending" ? (
        <div className='mx-auto'>
          <h1 className={`text-left text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
            Account Status
          </h1>

          <div className={`w-full max-w-md p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">User Details</h2>
            </div>

            <div className="text-left space-y-3">
              <p><span className="font-semibold">Name:</span> {currentUser?.userName || "N/A"}</p>
              <p><span className="font-semibold">Email:</span> {currentUser?.email || "N/A"}</p>
              <p><span className="font-semibold">Role:</span> {currentUser?.roles || "User"}</p>
              <p><span className="font-semibold">Account Status:</span> 
                <span className={`ml-2 font-bold ${userStatus === "approved" ? "text-green-500" : "text-yellow-500"}`}>
                  {currentUser?.userStatus}
                </span>
              </p>
            </div>

            {userStatus === "pending" && (
              <div className="mt-6 text-yellow-500 font-medium">
                Your account is under review by the administrator. Please wait for approval.
              </div>
            )}
          </div>
        </div>
      ) : (
      <div className={`dark:border-none border border-gray-300 bg-gray-700 -mt-7 p-2 rounded-lg ${!darkMode ? "bg-white" : "text-gray-800"}`}>
      <h1 className={`flex justify-around -ml-40 ${darkMode ? "text-white" : "text-gray-800"}`}>
  <FaUserCheck size={30} className="text-green-400" />
</h1>

</div>

      )}
    </div>
  );
};

export default UserNormalpending;
