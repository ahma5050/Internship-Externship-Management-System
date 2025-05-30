import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Button } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
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
  Filler,
  RadialLinearScale
} from 'chart.js';
import { CalendarCheck, BarChart3, PieChart, Trophy, TrendingUp, ChevronDown } from 'lucide-react';

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
  Filler,
  RadialLinearScale
);

const ProgressTracking = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [evaluations, setEvaluations] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const res = await fetch(`/api/evaluationRoute/progress/${currentUser._id}`);
        const data = await res.json();
        console.log('API Response Data:', data);
        
        setEvaluations(data.evaluations || []);
        setAttendance(data.attendance || []);
        setStudentInfo(data.studentInfo || null);
      } catch (error) {
        console.log('Error fetching progress data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [currentUser._id]);

  // Process data for charts with proper data validation
  const processChartData = () => {
    if (!studentInfo) return {};
    
    // 1. Weekly Performance Data with week dates
    const weeklyPerformance = evaluations.map((evalItem, index) => {
      const weeklyPerf = evalItem.weeklyPerformance || {};
      const performanceValues = Object.values(weeklyPerf);
      const avgScore = performanceValues.length ? 
        (performanceValues.reduce((a, b) => a + b, 0) / performanceValues.length) : 0;
      
      // Use actual week dates if available, otherwise fallback to index
      const weekLabel = evalItem.weekStartDate ? 
        `Week ${new Date(evalItem.weekStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 
        `Week ${index + 1}`;
      
      return {
        week: weekLabel,
        score: avgScore,
        overallGrade: evalItem.overallGrade || 0,
        weekStartDate: evalItem.weekStartDate
      };
    }).sort((a, b) => new Date(a.weekStartDate) - new Date(b.weekStartDate));

    // 2. Attendance by Day with check-in/check-out times
    const attendanceByDay = {};
    const dailyAttendanceDetails = [];
    
    attendance.forEach(record => {
      if (record.date) {
        const date = new Date(record.date);
        if (!isNaN(date)) {
          const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
          attendanceByDay[dayKey] = (attendanceByDay[dayKey] || 0) + 1;
          
          dailyAttendanceDetails.push({
            date: dayKey,
            checkIn: record.checkIn || '--:--',
            checkOut: record.checkOut || '--:--',
            status: record.status || 'unknown',
            notes: record.notes || ''
          });
        }
      }
    });

    // 3. Project Progress with deadlines and status
    const projectProgress = evaluations.map(evalItem => {
      const projectEval = evalItem.projectEvaluation || {};
      return {
        name: projectEval.title || 'Project',
        progress: projectEval.progress || 0,
        status: projectEval.status || 'Not Started',
        deadline: projectEval.deadline || '',
        remarks: projectEval.remarks || ''
      };
    });

    // 4. Skill Breakdown from all evaluations combined
    const skillBreakdownMap = new Map();
    
    evaluations.forEach(evalItem => {
      if (evalItem.weeklyPerformance) {
        Object.entries(evalItem.weeklyPerformance).forEach(([skill, score]) => {
          if (!skillBreakdownMap.has(skill)) {
            skillBreakdownMap.set(skill, []);
          }
          skillBreakdownMap.get(skill).push(score);
        });
      }
    });

    const skillBreakdown = Array.from(skillBreakdownMap.entries()).map(([skill, scores]) => ({
      skill: skill.charAt(0).toUpperCase() + skill.slice(1),
      score: scores.reduce((a, b) => a + b, 0) / scores.length,
      evaluations: scores.length
    }));

    return {
      weeklyPerformance,
      attendanceByDay,
      dailyAttendanceDetails,
      projectProgress,
      skillBreakdown
    };
  };

  const chartData = processChartData();
  console.log('Processed Chart Data:', chartData);

  // Enhanced chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        padding: 12,
        cornerRadius: 8,
        bodyFont: {
          size: 14
        },
        titleFont: {
          size: 16,
          weight: 'bold'
        },
        displayColors: true,
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== undefined) {
              label += context.parsed.y.toFixed(1);
            } else if (context.raw !== undefined) {
              label += context.raw.toFixed(1);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        max: 100,
        ticks: {
          font: {
            size: 12
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  // Performance Trend Chart with actual dates
  const performanceChartData = {
    labels: chartData.weeklyPerformance?.map(item => item.week) || ['Week 1'],
    datasets: [{
      label: 'Weekly Performance Score',
      data: chartData.weeklyPerformance?.map(item => item.score) || [0],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 2,
      tension: 0.3,
      pointBackgroundColor: '#3B82F6',
      pointRadius: 4,
      pointHoverRadius: 6
    }, {
      label: 'Overall Grade',
      data: chartData.weeklyPerformance?.map(item => item.overallGrade) || [0],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 2,
      tension: 0.3,
      pointBackgroundColor: '#10B981',
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };

  // Attendance Chart by Day
  const attendanceChartData = {
    labels: Object.keys(chartData.attendanceByDay || {'No Data': 0}),
    datasets: [{
      label: 'Daily Attendance',
      data: Object.values(chartData.attendanceByDay || {'No Data': 0}),
      backgroundColor: 'rgba(16, 185, 129, 0.7)',
      borderColor: 'rgba(16, 185, 129, 1)',
      borderWidth: 1,
      borderRadius: 4
    }]
  };

  // Project Progress Chart with status colors
  const projectChartData = {
    labels: chartData.projectProgress?.map(proj => proj.name) || ['Project'],
    datasets: [{
      label: 'Completion %',
      data: chartData.projectProgress?.map(proj => proj.progress) || [0],
      backgroundColor: chartData.projectProgress?.map(proj => {
        switch(proj.status.toLowerCase()) {
          case 'approved': return 'rgba(16, 185, 129, 0.7)';
          case 'created': return 'rgba(99, 102, 241, 0.7)';
          case 'rejected': return 'rgba(239, 68, 68, 0.7)';
          default: return 'rgba(156, 163, 175, 0.7)';
        }
      }) || ['rgba(156, 163, 175, 0.7)'],
      borderColor: chartData.projectProgress?.map(proj => {
        switch(proj.status.toLowerCase()) {
          case 'approved': return 'rgba(16, 185, 129, 1)';
          case 'created': return 'rgba(99, 102, 241, 1)';
          case 'rejected': return 'rgba(239, 68, 68, 1)';
          default: return 'rgba(156, 163, 175, 1)';
        }
      }) || ['rgba(156, 163, 175, 1)'],
      borderWidth: 1,
      cutout: '65%'
    }]
  };

  // Skill Radar Chart with evaluation count
  const skillChartData = {
    labels: chartData.skillBreakdown?.map(skill => skill.skill) || ['Skill'],
    datasets: [{
      label: 'Average Skill Rating',
      data: chartData.skillBreakdown?.map(skill => skill.score) || [0],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(59, 130, 246, 1)',
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };

  // Helper functions
  const average = (arr) => arr.length ? (arr.reduce((a, b) => a + b, 0)) / arr.length : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your progress data...</p>
        </div>
      </div>
    );
  }

  if (!studentInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <Card className="text-center p-8">
          <BarChart3 className="mx-auto text-gray-400" size={48} />
          <h2 className="text-xl font-semibold mt-4">No Student Data Available</h2>
          <p className="text-gray-500 mt-2">
            We couldn't find any student information associated with your account.
          </p>
        </Card>
      </div>
    );
  }

  if (evaluations.length === 0 && attendance.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="text-center p-8">
          <BarChart3 className="mx-auto text-gray-400" size={48} />
          <h2 className="text-xl font-semibold mt-4">No Progress Data Available</h2>
          <p className="text-gray-500 mt-2">
            Your progress charts will appear here once you have evaluation and attendance data.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen  bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Progress Dashboard</h1>
          <p className="text-gray-500">
            {studentInfo.name} • {studentInfo.email}
          </p>
          {studentInfo.startDate && studentInfo.endDate && (
            <p className="text-gray-500 mt-1">
              Internship Period: {new Date(studentInfo.startDate).toLocaleDateString()} - {new Date(studentInfo.endDate).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 mr-4">
                <CalendarCheck className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Attendance</p>
                <p className="text-2xl font-bold">{attendance.length}</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 mr-4">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Performance</p>
                <p className="text-2xl font-bold">
                  {chartData.weeklyPerformance?.length ? average(chartData.weeklyPerformance.map(item => item.score)).toFixed(1) : '0.0'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100 mr-4">
                <BarChart3 className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Projects</p>
                <p className="text-2xl font-bold">
                  {chartData.projectProgress?.length || 0}
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-amber-100 mr-4">
                <Trophy className="text-amber-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Overall Grade</p>
                <p className="text-2xl font-bold">
                  {chartData.weeklyPerformance?.length ? average(chartData.weeklyPerformance.map(item => item.overallGrade)).toFixed(1) : '0.0'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Performance Trend */}
          <Card className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-blue-500 mr-3" size={20} />
              <h2 className="text-lg font-semibold">Performance Trend</h2>
            </div>
            <div className="h-80">
              <Line 
                data={performanceChartData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    tooltip: {
                      ...chartOptions.plugins.tooltip,
                      callbacks: {
                        label: (context) => {
                          return `${context.dataset.label}: ${context.raw.toFixed(1)}/10`;
                        }
                      }
                    }
                  }
                }} 
              />
            </div>
          </Card>

          {/* Attendance */}
        
<Card className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">
      <CalendarCheck className="text-green-500 mr-3" size={20} />
      <h2 className="text-lg font-semibold">Attendance Records</h2>
    </div>
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" size="sm" className="text-sm">
          Recent Attendance
          <ChevronDown className="ml-1" size={16} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Recent Attendance" 
        className="max-h-60 overflow-y-auto"
      >
        {chartData.dailyAttendanceDetails?.length > 0 ? (
          chartData.dailyAttendanceDetails.map((record, index) => (
            <DropdownItem key={index} textValue={record.date}>
              <div className="flex justify-between w-full items-center">
                <span className="font-medium">{record.date}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {record.checkIn || '--:--'} - {record.checkOut || '--:--'}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    record.status === 'approved' ? 'bg-green-100 text-green-800' :
                    record.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {record.status}
                  </span>
                </div>
              </div>
            </DropdownItem>
          ))
        ) : (
          <DropdownItem isReadOnly>No attendance records</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  </div>
  
  <div className="h-80">
    <Bar 
      data={attendanceChartData} 
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#ffffff',
            titleColor: '#111827',
            bodyColor: '#374151',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            usePointStyle: true,
            callbacks: {
              title: (context) => {
                const date = context[0].label;
                const record = chartData.dailyAttendanceDetails?.find(r => r.date === date);
                return [
                  `Date: ${date}`,
                  record ? `Last In: ${record.checkIn || '--:--'}` : '',
                  record ? `Last Out: ${record.checkOut || '--:--'}` : ''
                ];
              },
              label: (context) => {
                return `Total records: ${context.raw}`;
              },
              afterLabel: (context) => {
                const date = context.label;
                const record = chartData.dailyAttendanceDetails?.find(r => r.date === date);
                return record ? `Status: ${record.status}` : '';
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#6b7280'
            }
          },
          y: {
            grid: {
              color: '#e5e7eb'
            },
            ticks: {
              color: '#6b7280',
              precision: 0
            }
          }
        },
        elements: {
          bar: {
            borderRadius: 6,
            backgroundColor: 'rgba(16, 185, 129, 0.7)',
            hoverBackgroundColor: 'rgba(5, 150, 105, 1)'
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
              <h2 className="text-lg font-semibold">Project Progress</h2>
            </div>
            <div className="h-80">
              <Doughnut 
                data={projectChartData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    tooltip: {
                      ...chartOptions.plugins.tooltip,
                      callbacks: {
                        label: (context) => {
                          const project = chartData.projectProgress[context.dataIndex];
                          return [
                            `Progress: ${context.raw}%`,
                            `Status: ${project.status}`,
                            project.deadline && `Deadline: ${new Date(project.deadline).toLocaleDateString()}`,
                            project.remarks && `Remarks: ${project.remarks}`
                          ].filter(Boolean);
                        }
                      }
                    }
                  }
                }} 
              />
            </div>
          </Card>

          {/* Skills Radar */}
          <Card className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <PieChart className="text-amber-500 mr-3" size={20} />
              <h2 className="text-lg font-semibold">Skills Assessment</h2>
            </div>
            <div className="h-80">
              <Radar 
                data={skillChartData} 
                options={{
                  ...chartOptions,
                  scales: {
                    r: {
                      angleLines: { display: true },
                      suggestedMin: 0,
                      suggestedMax: 10,
                      ticks: {
                        stepSize: 2,
                        backdropColor: 'transparent'
                      }
                    }
                  },
                  plugins: {
                    ...chartOptions.plugins,
                    tooltip: {
                      ...chartOptions.plugins.tooltip,
                      callbacks: {
                        label: (context) => {
                          const skill = chartData.skillBreakdown[context.dataIndex];
                          return [
                            `Rating: ${context.raw.toFixed(1)}/10`,
                            `Evaluated ${skill.evaluations} time${skill.evaluations !== 1 ? 's' : ''}`
                          ];
                        }
                      }
                    }
                  }
                }} 
              />
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressTracking;