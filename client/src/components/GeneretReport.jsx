import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { CalendarCheck, BarChart3, PieChart, Trophy, TrendingUp } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const GenerateReport = () => {
  const [attendanceStats, setAttendanceStats] = useState({ labels: [], data: [] });
  const [attendances, setAttendances] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facultyId = localStorage.getItem("facultyId");
        
        // Fetch attendance data
        const attendanceRes = await fetch(`/api/attendanceRoute/approved/${facultyId}`);
        const attendanceData = await attendanceRes.json();
        setAttendances(Array.isArray(attendanceData) ? attendanceData : []);

        // Process attendance data for chart
        const monthlyCounts = {};
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        attendanceData.forEach(att => {
          const date = new Date(att.date);
          if (!isNaN(date)) {
            const month = monthNames[date.getMonth()];
            monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
          }
        });

        // Fetch evaluation data
        const evaluationRes = await fetch(`/api/evaluationRoute/evaluations/${facultyId}`);
        const evaluationData = await evaluationRes.json();
        setEvaluations(Array.isArray(evaluationData) ? evaluationData : []);

        setAttendanceStats({
          labels: monthNames,
          data: monthNames.map(month => monthlyCounts[month] || 0)
        });

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper functions
  const average = (arr) => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : 0;

  const performanceScores = evaluations.map(e => {
    const perf = e.weeklyPerformance || {};
    const values = Object.values(perf).filter(v => typeof v === 'number');
    return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  });

  const projectScores = evaluations.map(e => e.projectEvaluation?.progress || 0);
  const overallGrades = evaluations.map(e => e.overallGrade || 0);

  // Enhanced chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: 'Inter'
          },
          color: '#6B7280'
        }
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        },
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#E5E7EB',
          drawBorder: false
        },
        ticks: {
          color: '#6B7280'
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: '#6B7280'
        }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        backgroundColor: '#FFFFFF',
        borderWidth: 2
      }
    }
  };

  // Stunning chart data configurations
  const attendanceChartData = {
    labels: attendanceStats.labels,
    datasets: [{
      label: 'Monthly Attendance',
      data: attendanceStats.data,
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#3B82F6'
    }]
  };

  const performanceChartData = {
    labels: evaluations.map((e, i) => `Week ${i + 1}`),
    datasets: [{
      label: 'Performance Score',
      data: performanceScores,
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#10B981'
    }]
  };

  const projectProgressData = {
    labels: evaluations.map((e, i) => `Project ${i + 1}`),
    datasets: [{
      label: 'Completion %',
      data: projectScores,
      backgroundColor: [
        'rgba(99, 102, 241, 0.7)',
        'rgba(168, 85, 247, 0.7)',
        'rgba(236, 72, 153, 0.7)',
        'rgba(249, 115, 22, 0.7)'
      ],
      borderColor: [
        'rgba(99, 102, 241, 1)',
        'rgba(168, 85, 247, 1)',
        'rgba(236, 72, 153, 1)',
        'rgba(249, 115, 22, 1)'
      ],
      borderWidth: 1,
      borderRadius: 8
    }]
  };

  const gradeDistributionData = {
    labels: ['Excellent (90-100)', 'Good (75-89)', 'Average (50-74)', 'Needs Improvement (<50)'],
    datasets: [{
      label: 'Grade Distribution',
      data: [
        overallGrades.filter(g => g >= 90).length,
        overallGrades.filter(g => g >= 75 && g < 90).length,
        overallGrades.filter(g => g >= 50 && g < 75).length,
        overallGrades.filter(g => g < 50).length
      ],
      backgroundColor: [
        'rgba(16, 185, 129, 0.7)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(234, 179, 8, 0.7)',
        'rgba(239, 68, 68, 0.7)'
      ],
      borderColor: [
        'rgba(16, 185, 129, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(234, 179, 8, 1)',
        'rgba(239, 68, 68, 1)'
      ],
      borderWidth: 1
    }]
  };

  const radarChartData = {
    labels: ['Teamwork', 'Initiative', 'Focus', 'Reporting', 'Communication', 'Punctuality', 'Discipline', 'Growth'],
    datasets: evaluations.slice(0, 3).map((e, i) => ({
      label: `Student ${i + 1}`,
      data: [
        e.weeklyPerformance?.teamwork || 0,
        e.weeklyPerformance?.initiative || 0,
        e.weeklyPerformance?.focus || 0,
        e.weeklyPerformance?.reporting || 0,
        e.weeklyPerformance?.communication || 0,
        e.weeklyPerformance?.punctuality || 0,
        e.weeklyPerformance?.discipline || 0,
        e.weeklyPerformance?.growth || 0
      ],
      backgroundColor: `rgba(${i === 0 ? '59, 130, 246' : i === 1 ? '16, 185, 129' : '234, 179, 8'}, 0.2)`,
      borderColor: `rgba(${i === 0 ? '59, 130, 246' : i === 1 ? '16, 185, 129' : '234, 179, 8'}, 1)`,
      borderWidth: 2,
      pointBackgroundColor: `rgba(${i === 0 ? '59, 130, 246' : i === 1 ? '16, 185, 129' : '234, 179, 8'}, 1)`,
      pointRadius: 4
    }))
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-sans">Performance Analytics Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Comprehensive overview of student performance metrics</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/20">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 mr-4">
                <CalendarCheck className="text-blue-600 dark:text-blue-300" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Approved</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{attendances.length}</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/20">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/50 mr-4">
                <BarChart3 className="text-green-600 dark:text-green-300" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Evaluations</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-300">{evaluations.length}</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/20">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/50 mr-4">
                <TrendingUp className="text-purple-600 dark:text-purple-300" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Performance</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">{average(performanceScores)}</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/20">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-amber-100 dark:bg-amber-900/50 mr-4">
                <Trophy className="text-amber-600 dark:text-amber-300" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Project Score</p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-300">{average(projectScores)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Attendance Trend */}
          <Card className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <CalendarCheck className="text-blue-500 mr-3" size={20} />
              <h2 className="text-lg font-semibold">Monthly Attendance Trend</h2>
            </div>
            <div className="h-80">
              <Line 
                data={attendanceChartData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      display: true,
                      text: 'Attendance Pattern Over Months',
                      font: {
                        size: 16,
                        weight: 'bold'
                      },
                      padding: {
                        bottom: 20
                      }
                    }
                  }
                }} 
              />
            </div>
          </Card>

          {/* Performance Trend */}
          <Card className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-green-500 mr-3" size={20} />
              <h2 className="text-lg font-semibold">Weekly Performance Trend</h2>
            </div>
            <div className="h-80">
              <Line 
                data={performanceChartData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      display: true,
                      text: 'Performance Improvement Over Time',
                      font: {
                        size: 16,
                        weight: 'bold'
                      },
                      padding: {
                        bottom: 20
                      }
                    }
                  }
                }} 
              />
            </div>
          </Card>

          {/* Project Progress */}
          <Card className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <BarChart3 className="text-purple-500 mr-3" size={20} />
              <h2 className="text-lg font-semibold">Project Completion Progress</h2>
            </div>
            <div className="h-80">
              <Bar 
                data={projectProgressData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      display: true,
                      text: 'Project Completion Status',
                      font: {
                        size: 16,
                        weight: 'bold'
                      },
                      padding: {
                        bottom: 20
                      }
                    }
                  }
                }} 
              />
            </div>
          </Card>

          {/* Grade Distribution //439220*/}
          <Card className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <PieChart className="text-amber-500 mr-3" size={20} />
              <h2 className="text-lg font-semibold">Overall Grade Distribution</h2>
            </div>
            <div className="h-80">
              <Doughnut 
                data={gradeDistributionData} 
                options={{
                  ...chartOptions,
                  cutout: '70%',
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      display: true,
                      text: 'Grade Categories Breakdown',
                      font: {
                        size: 16,
                        weight: 'bold'
                      },
                      padding: {
                        bottom: 20
                      }
                    }
                  }
                }} 
              />
            </div>
          </Card>
        </div>

        {/* Additional Visualizations */}
        {evaluations.length > 0 && (
          <Card className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all mb-6">
            <div className="flex items-center mb-4">
              <Trophy className="text-red-500 mr-3" size={20} />
              <h2 className="text-lg font-semibold">Top Performers Comparison</h2>
            </div>
            <div className="h-96">
              <Line 
                data={radarChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Skills Radar Chart for Top Students',
                      font: {
                        size: 16,
                        weight: 'bold'
                      }
                    }
                  },
                  scales: {
                    r: {
                      angleLines: {
                        display: true,
                        color: 'rgba(209, 213, 219, 0.5)'
                      },
                      suggestedMin: 0,
                      suggestedMax: 10,
                      ticks: {
                        stepSize: 2,
                        backdropColor: 'transparent'
                      },
                      pointLabels: {
                        font: {
                          size: 12
                        }
                      }
                    }
                  }
                }} 
              />
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default GenerateReport;