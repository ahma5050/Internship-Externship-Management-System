import React, { useContext, useState } from 'react';
import { FiCheck, FiX, FiClock, FiUser, FiSearch, FiSun, FiMoon, FiFileText, FiPercent, FiAward } from 'react-icons/fi';
import { ThemContext } from '../context/ThemContext';

const GradingActivity = () => {
 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeInput, setGradeInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');
const { darkModehandle, darkMode } = useContext(ThemContext);
  const submissions = [
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'S12345',
      assignment: 'React Component Development',
      submittedDate: '2023-06-15',
      status: 'pending',
      files: ['/submissions/john-doe-assignment1.pdf'],
      rubric: {
        functionality: 0,
        codeQuality: 0,
        documentation: 0,
        creativity: 0,
        attendance: 0
      }
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentId: 'S12346',
      assignment: 'API Integration Task',
      submittedDate: '2023-06-12',
      status: 'graded',
      grade: '85%',
      feedback: 'Excellent work on the API integration. Consider adding more error handling.',
      files: ['/submissions/jane-smith-api-task.zip'],
      rubric: {
        functionality: 30,
        codeQuality: 25,
        documentation: 20,
        creativity: 10,
        attendance: 10,
      }
    },
    {
      id: '3',
      studentName: 'Alex Johnson',
      studentId: 'S12347',
      assignment: 'Database Design Project',
      submittedDate: '2023-06-18',
      status: 'pending',
      files: ['/submissions/alex-johnson-db-design.pdf'],
      rubric: {
        functionality: 0,
        codeQuality: 0,
        documentation: 0,
        creativity: 0,
        attendance: 0
      }
    }
  ];



  const handleGradeSubmit = (e) => {
    e.preventDefault();
    if (!selectedSubmission || !gradeInput) return;
    
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === selectedSubmission.id) {
        return {
          ...sub,
          status: 'graded',
          grade: gradeInput,
          feedback: feedbackInput,
          rubric: {
            functionality: 30,
            codeQuality: 25,
            documentation: 20,
            creativity: 10,
            attendance: 10
          }
        };
      }
      return sub;
    });
    
    setSelectedSubmission({
      ...selectedSubmission,
      status: 'graded',
      grade: gradeInput,
      feedback: feedbackInput
    });
    
    setGradeInput('');
    setFeedbackInput('');
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         submission.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.assignment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || submission.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const gradedCount = submissions.filter(s => s.status === 'graded').length;
  const averageGrade = submissions.filter(s => s.status === 'graded').reduce((acc, curr) => {
    return acc + parseInt(curr.grade);
  }, 0) / gradedCount || 0;

  const getStatusClass = (status, darkMode) => {
    if (status === 'pending') {
      return darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800';
    } else {
      return darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
       

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} mr-4`}>
                <FiClock className="text-blue-500" size={24} />
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pending</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${darkMode ? 'bg-green-900' : 'bg-green-100'} mr-4`}>
                <FiCheck className="text-green-500" size={24} />
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Graded</p>
                <p className="text-2xl font-bold">{gradedCount}</p>
              </div>
            </div>
          </div>

          <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} mr-4`}>
                <FiPercent className="text-purple-500" size={24} />
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Average Grade</p>
                <p className="text-2xl font-bold">{gradedCount > 0 ? `${averageGrade.toFixed(1)}%` : 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} mr-4`}>
                <FiPercent className="text-purple-500" size={24} />
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Average Attendance</p>
                <p className="text-2xl font-bold">{gradedCount > 0 ? `${averageGrade.toFixed(1)}%` : 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={`rounded-lg p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type="text"
                placeholder="Search submissions..."
                className={`block w-full pl-10 pr-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Filter:</label>
              <select
                className={`rounded-lg border px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="graded">Graded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submission List and Detail View */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Submission List */}
          <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow lg:w-1/2`}>
            <h2 className="text-xl font-semibold mb-4">Submissions</h2>
            <div className="space-y-4">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map(submission => (
                  <div 
                    key={submission.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} ${selectedSubmission?.id === submission.id ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{submission.studentName}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{submission.assignment}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Submitted: {submission.submittedDate}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(submission.status, darkMode)}`}>
                        {submission.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No submissions found</p>
              )}
            </div>
          </div>

          {/* Submission Detail View */}
          <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow lg:w-1/2`}>
            {selectedSubmission ? (
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedSubmission.studentName}</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID: {selectedSubmission.studentId}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className={`px-3 py-1 text-sm rounded-full ${getStatusClass(selectedSubmission.status, darkMode)}`}>
                        {selectedSubmission.status}
                      </span>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Submitted: {selectedSubmission.submittedDate}
                      </span>
                    </div>
                  </div>
                  {selectedSubmission.status === 'graded' && (
                    <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
                      <span className="font-bold">{selectedSubmission.grade}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Assignment Details</h3>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Assignment</p>
                          <p>{selectedSubmission.assignment}</p>
                        </div>
                        <div>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Files</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedSubmission.files.map((file, index) => (
                              <a 
                                key={index}
                                href={file} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`inline-flex items-center text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                              >
                                <FiFileText className="mr-1" /> File {index + 1}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedSubmission.status === 'graded' ? (
                    <>
                      <div>
                        <h3 className="font-semibold mb-2">Grading Rubric</h3>
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Functionality</p>
                              <p>{selectedSubmission.rubric.functionality}/30</p>
                            </div>
                            <div>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Code Quality</p>
                              <p>{selectedSubmission.rubric.codeQuality}/25</p>
                            </div>
                            <div>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Documentation</p>
                              <p>{selectedSubmission.rubric.documentation}/20</p>
                            </div>
                            <div>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Creativity</p>
                              <p>{selectedSubmission.rubric.creativity}/10</p>
                            </div>
                            <div>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Attendance</p>
                              <p>{selectedSubmission.rubric.attendance}/10</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Feedback</h3>
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className="whitespace-pre-line">{selectedSubmission.feedback}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <h3 className="font-semibold mb-2">Grade Submission</h3>
                      <form onSubmit={handleGradeSubmit}>
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-4`}>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Functionality (0-30)
                              </label>
                              <input
                                type="number"
                                min="0"
                                max="30"
                                className={`w-full rounded-lg border px-3 py-2 ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                                value="30"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Code Quality (0-25)
                              </label>
                              <input
                                type="number"
                                min="0"
                                max="25"
                                className={`w-full rounded-lg border px-3 py-2 ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                                value="25"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Documentation (0-20)
                              </label>
                              <input
                                type="number"
                                min="0"
                                max="20"
                                className={`w-full rounded-lg border px-3 py-2 ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                                value="20"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Creativity (0-10)
                              </label>
                              <input
                                type="number"
                                min="0"
                                max="10"
                                className={`w-full rounded-lg border px-3 py-2 ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                                value="10"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Attendance (0-10)
                              </label>
                              <input
                                type="number"
                                min="0"
                                max="10"
                                className={`w-full rounded-lg border px-3 py-2 ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                                value="10"
                                readOnly
                              />
                            </div>
                          </div>

                          <div className="mb-4">
                            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Grade (%)
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              className={`w-full rounded-lg border px-3 py-2 ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                              value={gradeInput}
                              onChange={(e) => setGradeInput(e.target.value)}
                              required
                            />
                          </div>

                          <div className="mb-4">
                            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Feedback
                            </label>
                            <textarea
                              className={`w-full rounded-lg border px-3 py-2 ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                              rows="4"
                              value={feedbackInput}
                              onChange={(e) => setFeedbackInput(e.target.value)}
                            />
                          </div>

                          <button
                            type="submit"
                            className={`px-4 py-2 rounded-lg font-medium ${darkMode ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                          >
                            Submit Grade
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <FiFileText size={48} className="mx-auto mb-4" />
                <p>Select a submission to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingActivity;