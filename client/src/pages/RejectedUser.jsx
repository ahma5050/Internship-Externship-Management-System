import React, { useState, useEffect, useContext } from 'react';
import { ThemContext } from '../context/ThemContext';
import { motion } from 'framer-motion';
import { XCircle, Mail, University, Briefcase, User } from 'lucide-react';

const RejectedUser = () => {
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const { darkMode } = useContext(ThemContext);

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
    <div className={`min-h-screen p-6 transition-all ${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-white to-gray-100 text-gray-900"}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-600">
            Rejected Applications
          </h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Unfortunately, these applications have been rejected.
          </p>
        </motion.div>

        {rejectedUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-xl ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No rejected applications yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rejectedUsers.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -5 }}
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-full ${darkMode ? "bg-gray-700" : "bg-red-50"}`}>
                        <User className={`w-6 h-6 ${darkMode ? "text-red-400" : "text-red-600"}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{user.firstName} {user.lastName}</h3>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-800"}`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                    <XCircle className="text-red-500 flex-shrink-0" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className={`w-5 h-5 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                      <p className="text-sm break-all">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <University className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                      <p className="text-sm">{user.university}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Briefcase className={`w-5 h-5 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                      <p className="text-sm">{user.position}</p>
                    </div>
                  </div>
                </div>
                <div className={`px-6 py-3 text-xs flex justify-between ${darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-600"}`}>
                  <span>Rejected</span>
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

export default RejectedUser;
