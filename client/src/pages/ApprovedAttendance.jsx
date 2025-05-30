import React, { useEffect, useState } from 'react';
import { HiCheckCircle, HiOfficeBuilding, HiCalendar, HiClock, HiUser, HiAnnotation } from 'react-icons/hi';
import { motion } from 'framer-motion';

const ApprovedAttendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        setLoading(true);
        const facultyId = localStorage.getItem("facultyId");
        const res = await fetch(`/api/attendanceRoute/approved/${facultyId}`);
        const data = await res.json();
        setAttendances(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch approved attendance:", err);
        setAttendances([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApproved();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Approved Attendance Records
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            View all approved student attendance submissions
          </p>
        </div>

        {attendances?.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center max-w-2xl mx-auto"
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <HiCheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No approved records yet
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Approved attendance records will appear here once processed.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {attendances.map((att, index) => (
              <motion.div
                key={att._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <div className="flex items-center justify-center h-full w-full bg-gray-400 text-white text-xl font-bold rounded-full border-2 border-cyan-300">
                             <span className=' text-pink-700 font-serif text-2xl'>{att?.studentName?.[0]}</span>
                           </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {att.studentName}
                      </h3>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      <HiCheckCircle className="mr-1 h-4 w-4" />
                      Approved
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
                          <span>Note</span>
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

export default ApprovedAttendance;