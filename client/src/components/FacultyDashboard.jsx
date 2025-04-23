import React, { useContext, useEffect, useState } from 'react';
import { MdPostAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import { ThemContext } from '../context/ThemContext';
import ApprovalFacality from './ApprovalFacality';
import { useSelector } from 'react-redux';

const FacultyDashboard = () => {
  const [stats, setStats] = useState({
    approved: 0,
    rejected: 0,
    approvedAttendance: 0,
    rejectedAttendance: 0
  });
  

  const { darkModehandle, darkMode } = useContext(ThemContext);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const facultyId = localStorage.getItem("facultyId");

        const [appRes, attRes] = await Promise.all([
          fetch(`/api/applicationRoute/facultyStats?facultyId=${facultyId}`),
          fetch(`/api/attendanceRoute/attendanceStats?facultyId=${facultyId}`)
        ]);

        const appData = await appRes.json();
        const attData = await attRes.json();

        setStats({
          approved: appData.approved || 0,
          rejected: appData.rejected || 0,
          approvedAttendance: attData.approvedAttendance || 0,
          rejectedAttendance: attData.rejectedAttendance || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 rounded-3xl shadow-xl border border-opacity-10 border-white dark:border-gray-700 overflow-hidden relative transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"></div>

      <h2 className="text-center text-5xl font-bold text-gray-800 dark:text-gray-100 mb-12 font-serif tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-gray-300 dark:via-gray-100 dark:to-white">
        Faculty Dashboard
      </h2>
      {currentUser.roles==="Faculty" && currentUser.status==="pending" ?
     (<ApprovalFacality />) :(

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 font-serif">
        {/* Posts */}
        <DashboardCard to="/DashPosts" icon={<MdPostAdd size={50} />} label="Posts" gradient="from-cyan-400 to-purple-600" />

        {/* Approved Applications */}
        <DashboardCard to="/ApprovedUser" value={stats.approved} label="Approved Appilcation" gradient="from-green-400 to-emerald-600" />

        {/* Rejected Applications */}
        <DashboardCard to="/RejectedUser" value={stats.rejected} label="Rejected Appilcation" gradient="from-red-400 to-pink-600" />

        {/* Approved Attendance */}
        <DashboardCard to="/ApprovedAttendance" value={stats.approvedAttendance} label="Attendance Approved" gradient="from-blue-400 to-indigo-600" />

        {/* Rejected Attendance */}
        <DashboardCard to="/RejectedAttendance" value={stats.rejectedAttendance} label="Attendance Rejected" gradient="from-yellow-400 to-orange-500" />
      </div>
     )}
    </div>
  );
};

const DashboardCard = ({ to, value, label, icon, gradient }) => (
  <Link
    to={to}
    className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700 overflow-hidden group hover:-translate-y-2"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className={`relative z-10 bg-gradient-to-br ${gradient} p-5 rounded-full text-white text-4xl font-bold mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
      {value !== undefined ? value : icon}
    </div>
    <p className="relative z-10 text-3xl font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
      {label}
    </p>
  </Link>
);

export default FacultyDashboard;
