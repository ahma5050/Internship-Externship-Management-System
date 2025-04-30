import React from 'react';
import { Card } from 'flowbite-react';
import { 
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { 
  BookOpenCheck, 
  CalendarCheck, 
  Clock, 
  AlertTriangle,
  Trophy,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const GenerateReport = () => {
  // Sample data - replace with your actual data
  const attendanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Attendance Rate',
        data: [92, 88, 95, 90, 93, 97],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const gradeData = {
    labels: ['Math', 'Science', 'History', 'English', 'Art'],
    datasets: [
      {
        label: 'Average Grade',
        data: [85, 78, 92, 88, 95],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const delinquencyData = {
    labels: ['On Time', 'Late', 'Missing'],
    datasets: [
      {
        label: 'Assignment Status',
        data: [75, 15, 10],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const performanceTrendData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Overall Performance',
        data: [70, 78, 85, 88],
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.4,
      },
    ],
  };

  const stats = [
    { title: 'Overall Attendance', value: '92%', icon: <UserCheck className="w-6 h-6" />, change: '+2%' },
    { title: 'Average Grade', value: '87.6', icon: <BookOpenCheck className="w-6 h-6" />, change: '+1.2' },
    { title: 'On Time Assignments', value: '75%', icon: <Clock className="w-6 h-6" />, change: '-5%' },
    { title: 'Behavior Incidents', value: '3', icon: <AlertTriangle className="w-6 h-6" />, change: '-2' },
  ];

  return (
    <div className="p-6 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 dark:text-gray-100 font-serif">Student Performance Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change} from last period
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    {stat.icon}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Attendance Chart */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Card className="h-full">
              <div className="flex items-center mb-4">
                <CalendarCheck className="w-8 h-8 mr-2 text-blue-600  bg-gray-400 p-1 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-800">Attendance Trend</h2>
              </div>
              <div className="h-80">
                <Line 
                  data={attendanceData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: false,
                        min: 80,
                        max: 100,
                      },
                    },
                  }}
                />
              </div>
            </Card>
          </motion.div>

          {/* Grade Distribution */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Card className="h-full">
              <div className="flex items-center mb-4">
                <Trophy className="w-8 h-8 mr-2 text-yellow-600  bg-gray-400 p-1 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-800">Grade Distribution</h2>
              </div>
              <div className="h-80">
                <Bar 
                  data={gradeData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                      },
                    },
                  }}
                />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Delinquency Chart */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Card className="h-full">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-8 h-8 mr-2 text-red-600 bg-gray-400 p-1 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-800">Assignment Compliance</h2>
              </div>
              <div className="h-80">
                <Pie 
                  data={delinquencyData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </Card>
          </motion.div>

          {/* Performance Trend */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Card className="h-full">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 mr-2 text-green-600 bg-gray-400 p-1 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-800">Performance Trend</h2>
              </div>
              <div className="h-80">
                <Doughnut 
                  data={performanceTrendData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default GenerateReport;