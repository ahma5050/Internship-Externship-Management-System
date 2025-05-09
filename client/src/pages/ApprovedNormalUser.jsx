import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Spinner, Badge } from 'flowbite-react';
import { 
  HiOutlineUserCircle, 
  HiOutlineMail, 
  HiOutlineShieldCheck, 
  HiCheckCircle,
  HiOutlineUserGroup,
  HiOutlineStatusOnline
} from 'react-icons/hi';
import { ThemContext } from '../context/ThemContext';

const ApprovedNormalUser = () => {
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { darkMode } = useContext(ThemContext);

  const fetchApprovedUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/AuthRoute/approved-user-admin", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error fetching users");
      setApprovedUsers(data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedUsers();
  }, []);

  return (
    <div className={`min-h-screen p-4 md:p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
          <div className="flex items-center mb-4 md:mb-0">
            <div className={`p-3 rounded-xl mr-4 ${darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-50 text-green-600'}`}>
              <HiOutlineUserGroup className="h-6 w-6" />
            </div>
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Approved Users
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                View all system-approved user accounts
              </p>
            </div>
          </div>
          
          <div className={`flex items-center px-4 py-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <span className={`text-sm font-medium mr-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Approved
            </span>
            <span className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${darkMode ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'}`}>
              {approvedUsers.length}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`p-4 mb-6 rounded-xl flex items-start ${darkMode ? 'bg-red-900/30 text-red-300 border border-red-800' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            <div className={`p-1.5 rounded-full mr-3 ${darkMode ? 'bg-red-800/50' : 'bg-red-100'}`}>
              <HiOutlineShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Error Loading Users</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className={`flex flex-col items-center justify-center py-16 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <Spinner size="xl" color={darkMode ? "green" : "success"} />
            <p className={`mt-4 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Loading approved users...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && approvedUsers.length === 0 && (
          <div className={`flex flex-col items-center justify-center py-16 rounded-xl text-center ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className={`p-4 rounded-full mb-4 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
              <HiOutlineUserCircle className="h-8 w-8" />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              No Approved Users Yet
            </h3>
            <p className={`max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              There are currently no approved users in the system.
            </p>
          </div>
        )}

        {/* User Cards Grid */}
        {!loading && approvedUsers.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {approvedUsers.map((user) => (
              <div 
                key={user._id} 
                className={`rounded-xl overflow-hidden transition-all hover:shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700 hover:border-green-400/30' : 'bg-white border border-gray-200 hover:border-green-500/50'}`}
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar
                      img={`https://ui-avatars.com/api/?name=${user.userName}&background=random`}
                      rounded
                      size="lg"
                      bordered
                      color={darkMode ? "green" : "success"}
                    />
                    <div className="min-w-0 flex-1">
                      <h2 className={`text-lg font-bold truncate ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {user.userName}
                      </h2>
                      <div className="flex items-center text-sm mt-1">
                        <HiOutlineMail className={`mr-1.5 h-4 w-4 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`truncate ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{user.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge 
                      color={darkMode ? "green" : "success"} 
                      icon={HiOutlineShieldCheck}
                      className={`${darkMode ? 'bg-green-900/30' : 'bg-green-50'}`}
                    >
                      {user.roles}
                    </Badge>
                    <Badge 
                      color={darkMode ? "blue" : "info"} 
                      icon={HiOutlineStatusOnline}
                      className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}
                    >
                      {user.userStatus}
                    </Badge>
                    <Badge 
                      color={darkMode ? "purple" : "pink"} 
                      icon={HiCheckCircle}
                      className={`${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`}
                    >
                      {user.applicationStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovedNormalUser;