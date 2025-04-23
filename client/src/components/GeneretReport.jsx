import React, { useContext, useState } from 'react';
import { 
  FiSun, FiMoon, FiDownload, FiPrinter, 
  FiUser, FiCalendar, FiAward, FiBarChart2, 
  FiPieChart, FiBriefcase, FiTrendingUp, FiUsers, FiLock 
} from 'react-icons/fi';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, AreaChart, Area, ComposedChart
} from 'recharts';
import { ThemContext } from '../context/ThemContext';

const GenerateReport = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAdminView, setShowAdminView] = useState(false);
    const { darkModehandle, darkMode } = useContext(ThemContext);

  // Sample student data
  const students = [
    {
      id: 'S001',
      name: 'John Doe',
      department: 'Computer Science',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      company: 'Tech Solutions Inc.',
      supervisor: 'Jane Smith',
      attendance: 92,
      performance: 88,
      skills: ['React', 'Node.js', 'MongoDB'],
      tasksCompleted: 24,
      totalTasks: 28,
      evaluation: 'Excellent problem-solving skills and quick learner',
      timeline: [
        { week: 1, completion: 15 },
        { week: 2, completion: 35 },
        { week: 3, completion: 50 },
        { week: 4, completion: 65 },
        { week: 5, completion: 80 },
        { week: 6, completion: 90 },
        { week: 7, completion: 95 },
        { week: 8, completion: 100 }
      ]
    },
    {
      id: 'S002',
      name: 'Alice Johnson',
      department: 'Business',
      startDate: '2023-06-15',
      endDate: '2023-09-15',
      company: 'Global Finance',
      supervisor: 'Robert Brown',
      attendance: 95,
      performance: 92,
      skills: ['Marketing', 'Data Analysis', 'Excel'],
      tasksCompleted: 30,
      totalTasks: 30,
      evaluation: 'Outstanding performance in client presentations',
      timeline: [
        { week: 1, completion: 20 },
        { week: 2, completion: 45 },
        { week: 3, completion: 60 },
        { week: 4, completion: 75 },
        { week: 5, completion: 85 },
        { week: 6, completion: 95 },
        { week: 7, completion: 98 },
        { week: 8, completion: 100 }
      ]
    }
  ];

  // Collective analysis data for advisors/admins
  const collectiveData = {
    averagePerformance: 87.5,
    averageAttendance: 92.3,
    completionRate: 94.1,
    skillDistribution: [
      { name: 'Technical', value: 78 },
      { name: 'Soft Skills', value: 85 },
      { name: 'Communication', value: 82 },
      { name: 'Initiative', value: 76 }
    ],
    performanceTrend: [
      { month: 'Jan', performance: 75 },
      { month: 'Feb', performance: 78 },
      { month: 'Mar', performance: 82 },
      { month: 'Apr', performance: 85 },
      { month: 'May', performance: 88 },
      { month: 'Jun', performance: 90 }
    ],
    departmentComparison: [
      { name: 'Computer Science', performance: 88, attendance: 93 },
      { name: 'Business', performance: 85, attendance: 91 },
      { name: 'Engineering', performance: 82, attendance: 89 }
    ]
  };

  // Chart data
  const performanceData = students.map(student => ({
    name: student.name,
    performance: student.performance,
    attendance: student.attendance,
    completion: Math.round((student.tasksCompleted / student.totalTasks) * 100)
  }));

  const skillData = students.reduce((acc, student) => {
    student.skills.forEach(skill => {
      const existing = acc.find(item => item.skill === skill);
      if (existing) existing.count++;
      else acc.push({ skill, count: 1 });
    });
    return acc;
  }, []);

  const weeklyCompletionData = students[0].timeline.map(week => ({
    week: `Week ${week.week}`,
    completion: week.completion
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 ">
        {/* Header with Admin Access */}
        <header className="flex justify-between items-center mb-8 ">
          <h1 className="text-3xl font-bold">Internship Report</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAdminView(!showAdminView)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              <FiLock className="h-4 w-4" />
              {showAdminView ? 'Student View' : 'Advisor View'}
            </button>
          </div>
        </header>

        {/* Main Content */}
        {showAdminView ? (
          /* ADMIN/ADVISOR VIEW */
          <div className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FiUsers className="text-indigo-500" /> Collective Analysis
            </h2>
            
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="font-medium mb-2">Average Performance</h3>
                <p className="text-3xl font-bold text-indigo-500">
                  {collectiveData.averagePerformance}%
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Across all students
                </p>
              </div>
              
              <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="font-medium mb-2">Average Attendance</h3>
                <p className="text-3xl font-bold text-green-500">
                  {collectiveData.averageAttendance}%
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Overall attendance rate
                </p>
              </div>
              
              <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="font-medium mb-2">Completion Rate</h3>
                <p className="text-3xl font-bold text-purple-500">
                  {collectiveData.completionRate}%
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tasks completed
                </p>
              </div>
            </div>

            {/* Department Comparison */}
            <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-xl font-semibold mb-4">Department Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={collectiveData.departmentComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="performance" fill="#8884d8" name="Performance" />
                    <Bar dataKey="attendance" fill="#82ca9d" name="Attendance" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Trend */}
            <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-xl font-semibold mb-4">Performance Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={collectiveData.performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="performance" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          /* STUDENT VIEW */
          <div>
            {/* Tabs */}
            <div className="flex border-b mb-6">
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'border-b-2 border-indigo-500' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <FiBarChart2 className="inline mr-2" /> Overview
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'students' ? 'border-b-2 border-indigo-500' : ''}`}
                onClick={() => setActiveTab('students')}
              >
                <FiUser className="inline mr-2" /> Students
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'details' ? 'border-b-2 border-indigo-500' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                <FiBriefcase className="inline mr-2" /> Details
              </button>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Performance Chart */}
                <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FiBarChart2 className="mr-2" /> Performance Overview
                  </h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="performance" fill="#8884d8" />
                        <Bar dataKey="attendance" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Skills Chart */}
                <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FiPieChart className="mr-2" /> Skills Distribution
                  </h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={skillData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {skillData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Weekly Progress */}
                <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FiTrendingUp className="mr-2" /> Weekly Progress
                  </h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyCompletionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="completion" 
                          stroke="#8884d8" 
                          fill="#8884d8" 
                          fillOpacity={0.2} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FiUser className="mr-2" /> Student List
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Performance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Attendance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students.map(student => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium">{student.name}</div>
                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {student.department}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">{student.company}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">{student.performance}/100</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">{student.attendance}%</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                {students.map(student => (
                  <div key={student.id} className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className="text-xl font-semibold mb-2">{student.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-1">Company</h3>
                        <p>{student.company}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Supervisor</h3>
                        <p>{student.supervisor}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Period</h3>
                        <p>{student.startDate} to {student.endDate}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Skills Developed</h3>
                        <div className="flex flex-wrap gap-2">
                          {student.skills.map(skill => (
                            <span key={skill} className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-medium mb-1">Evaluation</h3>
                      <p>{student.evaluation}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer with Export Options */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
          <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}>
            <FiDownload /> Export {showAdminView ? 'Admin Report' : 'Student Report'}
          </button>
          <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
            <FiPrinter /> Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;