import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { HiXCircle } from 'react-icons/hi';

const RejectedAttendance = () => {
  const [rejectedAttendances, setRejectedAttendances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRejectedAttendances = async () => {
      try {
        const facultyId = localStorage.getItem("facultyId");
        if (!facultyId) {
          console.warn("No facultyId found in localStorage.");
          return;
        }

        const response = await fetch(`/api/attendanceRoute/rejected/${facultyId}`);
        if (!response.ok) throw new Error('Failed to fetch rejected attendance');

        const data = await response.json();
        console.log("Rejected Attendance Data:", data);
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

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Rejected Attendance Records
      </h2>

      {loading ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">Loading...</p>
      ) : rejectedAttendances.length === 0 ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">
          No rejected attendance records available.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {rejectedAttendances.map((att) => (
            <Card
              key={att._id}
              className="hover:shadow-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 bg-white dark:bg-gray-800 rounded-3xl p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {att.studentName}
                </h5>
                <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-medium text-sm bg-red-50 dark:bg-red-900 px-3 py-1 rounded-full shadow-sm">
                  <HiXCircle size={18} />
                  Rejected
                </span>
              </div>
              <div className="space-y-1 text-gray-700 dark:text-gray-300">
                <p><strong>Company:</strong> {att.companyName}</p>
                <p><strong>Date:</strong> {att.date || 'Not provided'}</p>
                <p><strong>Check-in:</strong> {att.checkIn}</p>
                <p><strong>Check-out:</strong> {att.checkOut}</p>
                {att.notes && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    <strong>Note:</strong> {att.notes}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RejectedAttendance;
