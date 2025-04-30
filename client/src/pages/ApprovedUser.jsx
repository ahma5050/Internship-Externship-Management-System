import React, { useState, useEffect, useContext } from 'react';
import { ThemContext } from '../context/ThemContext';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, University, Briefcase, User } from 'lucide-react';

const ApprovedUser = () => {
  const [approvedUsers, setApprovedUsers] = useState([]);
  const { darkMode } = useContext(ThemContext);

  useEffect(() => {
    const fetchApprovedUsers = async () => {
      try {
        const facultyId = localStorage.getItem("facultyId");
        const res = await fetch(`/api/applicationRoute/approved?facultyId=${facultyId}`);
        const data = await res.json();
        setApprovedUsers(data);
      } catch (error) {
        console.error("Error fetching approved users:", error);
      }
    };
  
    fetchApprovedUsers();
  }, []);
  

  return (
    <div className={`min-h-screen p-6 transition-all ${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"}`}>
      <div className="max-w-7xl mx-auto">
        <div
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Approved Applications
          </h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Congratulations to all approved members! Welcome to our community.
          </p>
        </div>

        {approvedUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-xl ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No approved applications yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {approvedUsers.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -5, boxShadow: darkMode ? "0 10px 25px -5px rgba(0, 0, 0, 0.3)" : "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700 hover:border-purple-500"
                    : "bg-white border border-gray-200 hover:border-blue-500"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-full ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}>
                        <User className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{user.firstName} {user.lastName}</h3>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                          darkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800"
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                    <CheckCircle className="text-green-500 flex-shrink-0" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className={`w-5 h-5 flex-shrink-0 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                      <p className="text-sm break-all">{user.email}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <University className={`w-5 h-5 flex-shrink-0 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                      <p className="text-sm">{user.university}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Briefcase className={`w-5 h-5 flex-shrink-0 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                      <p className="text-sm">{user.position}</p>
                    </div>
                  </div>
                </div>
                
                <div className={`px-6 py-3 text-xs flex justify-between items-center ${
                  darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-600"
                }`}>
                  <span>Approved</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovedUser;