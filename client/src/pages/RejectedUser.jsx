import React, { useState, useEffect, useContext } from 'react';
import { ThemContext } from '../context/ThemContext';
import { motion } from 'framer-motion';
import { XCircle, Mail, University, Briefcase, User, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { Avatar } from 'flowbite-react';

const RejectedUser = () => {
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const { darkMode } = useContext(ThemContext);
  const defaultProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  useEffect(() => {
    const fetchRejectedUsers = async () => {
      try {
        const facultyId = localStorage.getItem("facultyId");
        const res = await fetch(`/api/applicationRoute/rejected?facultyId=${facultyId}`);
        if (!res.ok) throw new Error("Failed to fetch rejected applications");
        const data = await res.json();
        setRejectedUsers(data);
      } catch (error) {
        console.error("Error fetching rejected users:", error);
      }
    };

    fetchRejectedUsers();
  }, []);

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-all duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center mb-4 p-3 rounded-full bg-gradient-to-r from-red-500 to-pink-600 shadow-lg">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-600">
            Rejected Applications
          </h1>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            These applications didn't meet our current requirements. You may review them again if needed.
          </p>
        </motion.div>

        {rejectedUsers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-center py-16 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}
          >
            <div className="flex flex-col items-center justify-center">
              <Clock className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No rejected applications</h3>
              <p className={`max-w-md ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                When applications are rejected, they will appear here for your review.
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rejectedUsers.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.1, 
                  type: "spring", 
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={{ 
                  y: -8,
                  boxShadow: darkMode 
                    ? "0 15px 30px -5px rgba(0, 0, 0, 0.4)" 
                    : "0 15px 30px -5px rgba(0, 0, 0, 0.1)"
                }}
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700 hover:border-red-500"
                    : "bg-white border border-gray-200 hover:border-red-500"
                }`}
              >
                <div className="relative">
                  <div className={`absolute top-4 right-4 p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-red-50"} shadow-md`}>
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                  
                  <div className="p-6 pb-0">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`p-3 rounded-xl ${darkMode ? "bg-gray-700" : "bg-red-100"} shadow-sm`}>
                          {
                                               user?.portfolio === defaultProfileImage ? (
                                                 <div className="flex items-center justify-center h-14 w-14 bg-gray-400 text-white text-xl font-bold rounded-full ">
                                                 <span className='text-pink-700 font-serif text-2xl'>
                                 {user.firstName?.[0]}{user.lastName?.[0]}
                               </span>
                                                 </div>
                                               ) : (
                                                 <Avatar
                                                      img={`http://localhost:3000/uploads/${user.portfolio}`}
                                                   rounded
                                                   bordered
                                                  
                                                 />
                                               )
                                             }
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-block px-2.5 py-1 text-xs rounded-full ${
                            darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-800"
                          }`}>
                            Rejected
                          </span>
                          <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className={`w-5 h-5 mt-1 flex-shrink-0 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                      <div>
                        <p className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Email</p>
                        <p className="text-sm break-all">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <University className={`w-5 h-5 mt-1 flex-shrink-0 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                      <div>
                        <p className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>University</p>
                        <p className="text-sm">{user.university}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Briefcase className={`w-5 h-5 mt-1 flex-shrink-0 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                      <div>
                        <p className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Position</p>
                        <p className="text-sm">{user.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`px-6 py-4 flex justify-between items-center border-t ${
                  darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-100"
                }`}>
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Applied on {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                  <button 
                    className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} transition-colors`}
                    aria-label="View application details"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RejectedUser;