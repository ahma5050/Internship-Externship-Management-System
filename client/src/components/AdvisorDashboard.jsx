import React, { useEffect, useState, useContext } from 'react';
import { ThemContext } from '../context/ThemContext';

const defaultProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const AdvisorDashboard = () => {
  const { darkModehandle, darkMode } = useContext(ThemContext);
  const [advisorData, setAdvisorData] = useState([]);

  useEffect(() => {
    const fetchAdvisorInfo = async () => {
      try {
        const AdvisorId = localStorage.getItem("AdvisorId");
        const response = await fetch(`/api/AuthRoute/pendingAdvisor?AdvisorId=${AdvisorId}`);
        const data = await response.json();
        console.log("Fetched Advisor Data:", data);
        setAdvisorData(data);
      } catch (error) {
        console.error("Error fetching advisor data:", error);
      }
    };

    fetchAdvisorInfo();
  }, []);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    approved: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
  };

  const advisor = advisorData[0]; // safely grab first item

  return (
    <div>
      {advisor && advisor.status === "pending" && advisor.roles === "Advisor" ? (
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-sky-100 to-indigo-100 text-gray-900'} flex justify-center items-center transition-colors duration-300 min-h-screen`}>
          <div className={`rounded-xl shadow-lg p-6 w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-transform transform hover:scale-105`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">Advisor Dashboard</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {advisor.profile === defaultProfileImage ? (
                  <div className="flex items-center justify-center h-14 w-14 bg-gray-400 text-white text-xl font-bold rounded-full border-2 border-pink-700 border-dotted">
                    <span className='text-pink-700 font-serif text-2xl'>
                      {advisor.userName?.[0]}
                    </span>
                  </div>
                ) : (
                  <img
                    src={advisor.profile}
                    alt="Profile"
                    className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
                  />
                )}

                <div>
                  <h3 className="text-xl font-semibold">{advisor.userName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{advisor.email}</p>
                </div>
              </div>

              <div className="text-md">
                <p><strong>Role:</strong> {advisor.roles}</p>
                <p className="flex items-center">
                  <strong>Status:</strong>
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${statusColors[advisor.status] || statusColors.default}`}>
                    {advisor.status}
                  </span>
                </p>
                <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                  Joined: {new Date(advisor.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-4xl">Advisor Dashboard</p>
      )}
    </div>
  );
};

export default AdvisorDashboard;
