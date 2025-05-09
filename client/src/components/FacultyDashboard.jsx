import React, { useContext, useEffect, useState } from 'react';
import { MdPostAdd, MdApproval, MdCancel, MdCheckCircle, MdOutlinePending } from "react-icons/md";
import { Link } from 'react-router-dom';
import { ThemContext } from '../context/ThemContext';
import ApprovalFacality from './ApprovalFacality';
import { useSelector } from 'react-redux';

const FacultyDashboard = () => {
  const [stats, setStats] = useState({
    approved: 0,
    rejected: 0,
    approvedAttendance: 0,
    rejectedAttendance: 0,
    loading: true
  });
  
  const { darkMode } = useContext(ThemContext);
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
          loading: false
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  if (currentUser.roles === "Faculty" && currentUser.status === "pending") {
    return <ApprovalFacality />;
  }

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Faculty Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage your applications and attendance records
          </p>
        </div>

        {/* Stats Cards */}
        {stats.loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Posts Card */}
            <DashboardCard 
              to="/DashPosts" 
              icon={<MdPostAdd className="w-12 h-12" />} 
              label="Posts" 
              count="Create New"
              gradient="from-blue-500 to-indigo-600"
              iconColor="text-white"
            />

            {/* Approved Applications */}
            <DashboardCard 
              to="/ApprovedUser" 
              icon={<MdApproval className="w-12 h-12" />} 
              label="Approved Applications" 
              count={stats.approved}
              gradient="from-green-500 to-emerald-600"
              iconColor="text-white"
            />

            {/* Rejected Applications */}
            <DashboardCard 
              to="/RejectedUser" 
              icon={<MdCancel className="w-12 h-12" />} 
              label="Rejected Applications" 
              count={stats.rejected}
              gradient="from-red-500 to-pink-600"
              iconColor="text-white"
            />

            {/* Approved Attendance */}
            <DashboardCard 
              to="/ApprovedAttendance" 
              icon={<MdCheckCircle className="w-12 h-12" />} 
              label="Approved Attendance" 
              count={stats.approvedAttendance}
              gradient="from-teal-500 to-cyan-600"
              iconColor="text-white"
            />

            {/* Rejected Attendance */}
            <DashboardCard 
              to="/RejectedAttendance" 
              icon={<MdOutlinePending className="w-12 h-12" />} 
              label="Rejected Attendance" 
              count={stats.rejectedAttendance}
              gradient="from-amber-500 to-orange-600"
              iconColor="text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ to, count, label, icon, gradient, iconColor }) => (
  <Link
    to={to}
    className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
    
    <div className="relative z-10 p-6 text-white">
      <div className={`mb-4 inline-flex items-center justify-center p-3 rounded-full bg-white bg-opacity-20 ${iconColor}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-1">{label}</h3>
      <p className="text-3xl font-bold">
        {typeof count === 'number' ? count : (
          <span className="text-sm font-normal uppercase tracking-wider">{count}</span>
        )}
      </p>
    </div>
    
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300"></div>
  </Link>
);

export default FacultyDashboard;