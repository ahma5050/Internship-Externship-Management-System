import React, { useEffect, useState } from 'react';
import { HiXCircle, HiOfficeBuilding, HiCalendar, HiClock, HiUser, HiAnnotation } from 'react-icons/hi';
import { motion } from 'framer-motion';

const RejectedAttendance = () => {
  const [rejectedAttendances, setRejectedAttendances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRejectedAttendances = async () => {
      try {
        setLoading(true);
        const facultyId = localStorage.getItem("facultyId");
        if (!facultyId) {
          console.warn("No facultyId found in localStorage.");
          return;
        }

        const response = await fetch(`/api/attendanceRoute/rejected/${facultyId}`);
        if (!response.ok) throw new Error('Failed to fetch rejected attendance');

        const data = await response.json();
        setRejectedAttendances(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching rejected attendances:', error);
        setRejectedAttendances([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedAttendances();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Rejected Attendance Records
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Review declined student attendance submissions
          </p>
        </motion.div>

        {rejectedAttendances.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center max-w-2xl mx-auto border border-gray-200 dark:border-gray-700"
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50 mb-4">
              <HiXCircle className="h-6 w-6 text-red-500 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No rejected records found
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              All attendance submissions have been approved or are pending review.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {rejectedAttendances.map((att, index) => (
              <motion.div
                key={att._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <div className="flex items-center justify-center h-full w-full bg-gray-400 text-white text-xl font-bold rounded-full border-2 border-cyan-300">
                             <span className=' text-pink-700 font-serif text-2xl'>{att?.studentName?.[0]}</span>
                           </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {att.studentName}
                      </h3>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200">
                      <HiXCircle className="mr-1 h-4 w-4" />
                      Rejected
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <HiOfficeBuilding className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                      <span>{att.companyName}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <HiCalendar className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                      <span>{att.date || 'Not provided'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <HiClock className="flex-shrink-0 mr-2 h-4 w-4 text-blue-500" />
                        <span>{att.checkIn}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <HiClock className="flex-shrink-0 mr-2 h-4 w-4 text-red-500" />
                        <span>{att.checkOut}</span>
                      </div>
                    </div>
                    {att.notes && (
                      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <HiAnnotation className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                          <span>Rejection Note</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {att.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RejectedAttendance;