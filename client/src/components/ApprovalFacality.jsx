import React, { useEffect, useState } from 'react';
import { MdAccessTime } from "react-icons/md";

const ApprovalFacality = () => {
  const [status, setStatus] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacultyStatus = async () => {
      try {
        const facultyId = localStorage.getItem("facultyId");
        const res = await fetch(`/api/AuthRoute/faculty-status/${facultyId}`);
        const data = await res.json();
        console.log("Faculty data:", data);

        if (!res.ok) throw new Error(data.message);
        setStatus(data.status);
        setFaculty(data.faculty); // save full faculty data
      } catch (err) {
        console.error("Error fetching faculty status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyStatus();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-10 text-xl font-medium animate-pulse text-gray-600 dark:text-gray-300">
        Loading your dashboard...
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="flex justify-center items-center min-h-[80vh] px-4">
        <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-3xl shadow-2xl p-10 max-w-3xl w-full text-center transition-all duration-300">
          <div className="flex justify-center mb-6">
            <MdAccessTime className="text-yellow-500 dark:text-yellow-300 text-6xl animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-yellow-800 dark:text-yellow-200 mb-4 font-serif">
            Account Pending Approval
          </h2>
          <p className="text-lg text-yellow-700 dark:text-yellow-100 font-medium leading-relaxed mb-6">
            Your faculty account is currently <span className="font-semibold">awaiting admin verification</span>.
          </p>

          {/* Faculty Info Section */}
          {faculty && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-left space-y-4 border dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Your Details</h3>
              <p className="text-gray-700 dark:text-gray-300"><strong>userName:</strong> {faculty.userName}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {faculty.email}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Department:</strong> {faculty.department}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Status:</strong> {faculty.status}</p>
              {/* Add more fields as needed */}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 font-serif">Approval Faculty Panel</h1>
      {/* Actual dashboard UI for approved faculty */}
    </div>
  );
};

export default ApprovalFacality;
