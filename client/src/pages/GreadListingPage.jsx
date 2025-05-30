import React, { useEffect, useState, useContext } from "react";
import { ThemContext } from '../context/ThemContext';

const GradeListingPage = () => {
  const [groupedEvaluations, setGroupedEvaluations] = useState({});
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { darkMode } = useContext(ThemContext);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const facultyId = localStorage.getItem("facultyId");
        const res = await fetch(
          `/api/evaluationRoute/evaluations/${facultyId}`
        );
        const data = await res.json();
        console.log("data", data)
        
        const grouped = data.reduce((acc, evaluation) => {
          const { studentId } = evaluation;
          if (!acc[studentId]) acc[studentId] = [];
          acc[studentId].push(evaluation);
          return acc;
        }, {});
        setGroupedEvaluations(grouped);
      } catch (err) {
        console.error("Failed to load evaluations", err);
      }
    };

    fetchEvaluations();
  }, []);

  const toggleStudent = (userId) => {
    setExpandedStudent(expandedStudent === userId ? null : userId);
  };

  const filteredStudents = Object.entries(groupedEvaluations).filter(
    ([userId, evaluations]) => {
      const firstEval = evaluations[0];
      const studentName = firstEval?.studentName?.toLowerCase() || "";
      const studentEmail = firstEval?.studentEmail?.toLowerCase() || "";
      return (
        studentName.includes(searchTerm.toLowerCase()) ||
        studentEmail.includes(searchTerm.toLowerCase()) ||
        userId.includes(searchTerm)
      );
    }
  );

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Student Evaluations Dashboard
          </h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search students..."
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-400'} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-600' : 'focus:ring-blue-300'} transition-all`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className={`absolute right-3 top-2.5 h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className={`text-center py-12 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium">No evaluations found</h3>
            <p className="mt-1 text-sm">
              {searchTerm ? "Try a different search term" : "No students have been evaluated yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredStudents.map(([userId, evaluations]) => {
              const firstEval = evaluations[0];
              const averageGrade = (
                evaluations.reduce((sum, evalItem) => sum + (parseFloat(evalItem.overallGrade) || 0), 0) / 
                evaluations.length
              ).toFixed(1);

              return (
                <div 
                  key={userId} 
                  className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'}`}
                >
                  <div 
                    className={`p-5 cursor-pointer flex justify-between items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                    onClick={() => toggleStudent(userId)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold ${darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                        {firstEval?.studentName?.charAt(0) || '?'}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">
                          {firstEval?.studentName || "Unknown Student"}
                        </h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {firstEval?.studentEmail || "N/A"} • ID: {userId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Evaluations</span>
                        <p className="text-lg font-bold">{evaluations.length}</p>
                      </div>
                      <div className="text-center">
                        <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Grade</span>
                        <p className={`text-lg font-bold ${
                          averageGrade >= 90 ? 'text-green-500' : 
                          averageGrade >= 80 ? 'text-blue-500' : 
                          averageGrade >= 70 ? 'text-yellow-500' : 
                          'text-red-500'
                        }`}>
                          {averageGrade}
                        </p>
                      </div>
                      <svg
                        className={`h-5 w-5 transform transition-transform ${expandedStudent === userId ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  {expandedStudent === userId && (
                    <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-5`}>
                      <h3 className="text-lg font-medium mb-4">Evaluation Details</h3>
                      <div className="space-y-4">
                        {evaluations.map((evalItem, index) => (
                          <div 
                            key={index} 
                            className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-100'} transition-colors`}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Week Range</p>
                                <p>
                                  {formatDate(evalItem.weekStartDate)} - {formatDate(evalItem.weekEndDate)}
                                </p>
                              </div>
                              <div>
                                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Program Dates</p>
                                <p>
                                  {formatDate(evalItem.startDate)} - {formatDate(evalItem.endDate)}
                                </p>
                              </div>
                            
                            </div>

                            <div className="mb-4">
                              <h4 className="font-medium mb-2">Weekly Performance</h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {evalItem.weeklyPerformance && Object.entries(evalItem.weeklyPerformance).map(([key, value]) => (
                                  <div key={key} className="flex items-center">
                                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mr-2`}>
                                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                                    </span>
                                    <span className="font-semibold">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mb-4">
                              <h4 className="font-medium mb-2">Project Evaluation</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Title</p>
                                  <p>{evalItem.projectEvaluation?.title || "N/A"}</p>
                                </div>
                                <div>
                                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Progress</p>
                                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                      className="bg-blue-600 h-2.5 rounded-full" 
                                      style={{ width: `${evalItem.projectEvaluation?.progress || 0}%` }}
                                    ></div>
                                  </div>
                                  <p>{evalItem.projectEvaluation?.progress || 0}%</p>
                                </div>
                                <div>
                                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Deadline</p>
                                  <p>{formatDate(evalItem.projectEvaluation?.deadline)}</p>
                                </div>
                                <div className="lg:flex justify-between items-center "> 
                                <div>
                                  <p className={`text-xl  font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Overall Grade</p>
                                  <p className={`font-bold text-center ${
                                    evalItem.overallGrade >= 90 ? 'text-green-500' : 
                                    evalItem.overallGrade >= 80 ? 'text-blue-500' : 
                                    evalItem.overallGrade >= 70 ? 'text-yellow-500' : 
                                    'text-red-500'
                                  }`}>
                                    <span className="text-3xl font-serif">{evalItem.overallGrade || "N/A"}</span>
                                  </p>
                                  </div>

                                  <div>
                                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  evalItem.status === 'completed' &&
                                    (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') 
                             
                                }`}>
                                  {evalItem.projectEvaluation.status || 'unknown'}
                                </span>
                              </div>
                                </div>
                                
                              </div>
                            </div>

                            <div>
                              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Remarks</p>
                              <p className={`mt-1 p-3 rounded ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                {evalItem.projectEvaluation?.remarks || "No comments provided"}
                              </p>
                            </div>

                            <div className="mt-3 text-xs text-gray-500">
                              <p>Created at: {formatDate(evalItem.createdAt)}</p>
                              <p>Last updated: {formatDate(evalItem.updatedAt)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeListingPage;