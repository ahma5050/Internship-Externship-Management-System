import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

const UserattendanceApp = () => {
  const [pendingAttendances, setPendingAttendances] = useState([]);
  const [approvedAttendances, setApprovedAttendances] = useState([]);

  const facultyId = localStorage.getItem("facultyId");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch(
          `/api/attendanceRoute/pending?facultyId=${facultyId}&applicantId=${currentUser._id}`
        );
        const data = await res.json();
        setPendingAttendances(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching pending attendances:", err);
        setPendingAttendances([]);
      }
    };

    if (facultyId && currentUser?._id) {
      fetchPending();
    }
  }, [facultyId, currentUser]);

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await fetch(
          `/api/attendanceRoute/approved?facultyId=${facultyId}&applicantId=${currentUser._id}`
        );
        const data = await res.json();
        setApprovedAttendances(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching approved attendances:", err);
        setApprovedAttendances([]);
      }
    };

    if (facultyId && currentUser?._id) {
      fetchApproved();
    }
  }, [facultyId, currentUser]);

  return (
    <>
      {/* Pending Attendance */}
      <div className="max-w-6xl mx-auto py-10 px-6">
        <h2 className="text-4xl font-bold  text-gray-800 dark:text-white mb-10 font-serif">
          Pending Attendance
        </h2>

        {pendingAttendances.length === 0 ? (
          <p className=" text-gray-500 dark:text-gray-400">
            No pending attendance records.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {pendingAttendances.map((att) => (
              <Card key={att._id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-lg font-semibold">{att.studentName}</h5>
                  <span className="text-yellow-600 font-medium">
                    Pending...
                  </span>
                </div>
                <p>Company: {att.companyName}</p>
                <p>Date: {att.date}</p>
                <p>Check-in: {att.checkIn}</p>
                <p>Check-out: {att.checkOut}</p>
                <p>Notes: {att.notes}</p>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Approved Attendance */}
      <div className="max-w-6xl mx-auto py-10">
        <h2 className="text-4xl font-bold  text-gray-800 dark:text-white mb-10 font-serif">
          Approved Attendance
        </h2>

        {approvedAttendances.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No approved attendance records available.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {approvedAttendances.map((att) => (
              <Card
                key={att._id}
                className="hover:shadow-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 bg-white dark:bg-gray-800 rounded-3xl p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {att.studentName}
                  </h5>
                  <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium text-sm bg-green-50 dark:bg-green-900 px-3 py-1 rounded-full shadow-sm">
                    <HiCheckCircle size={18} />
                    Approved
                  </span>
                </div>
                <div className="space-y-1 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Company:</strong> {att.companyName}
                  </p>
                  <p>
                    <strong>Date:</strong> {att.date || "Not provided"}
                  </p>
                  <p>
                    <strong>Check-in:</strong> {att.checkIn}
                  </p>
                  <p>
                    <strong>Check-out:</strong> {att.checkOut}
                  </p>
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
    </>
  );
};

export default UserattendanceApp;
