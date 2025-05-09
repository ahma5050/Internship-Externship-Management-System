import React, { useContext, useEffect, useState } from 'react';
import { ThemContext } from '../context/ThemContext';

const Assigning = () => {
  const [advisors, setAdvisors] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [selectedAdvisorId, setSelectedAdvisorId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { darkMode } = useContext(ThemContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [advisorRes, usersRes] = await Promise.all([
          fetch('/api/AuthRoute/approved-advisors', { method: 'GET', credentials: 'include' }),
          fetch('/api/applicationRoute/getApprovedApplicationsForAdmin', { method: 'GET', credentials: 'include' })
        ]);
        const advisorData = await advisorRes.json();
        const usersData = await usersRes.json();

        setAdvisors(advisorData.advisors || []);
        setApprovedUsers(usersData || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async () => {
    const AdminId = localStorage.getItem('AdminId');
    setError('');
    setMessage('');

    if (!selectedAdvisorId || !selectedUserId || !startDate || !endDate || !AdminId) {
      setError('Please select advisor, student, start date, and end date.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/advisorAssignmentRoute/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          advisorId: selectedAdvisorId,
          userId: selectedUserId,
          AdminId,
          startDate,
          endDate,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Assignment failed');
      setMessage('Advisor assigned successfully!');
      setSelectedAdvisorId('');
      setSelectedUserId('');
      setStartDate('');
      setEndDate('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-16 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`max-w-4xl mx-auto p-6 rounded-xl shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className=" font-serif text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            ASSIGN ADVISOR TO STUDENT
          </h2>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-gray-700 text-cyan-400' : 'bg-blue-100 text-blue-800'}`}>
            Admin Panel
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="animate-spin w-12 h-12 border-4 border-t-cyan-500 border-white rounded-full" />
            <p className="text-lg">Loading advisor and student data...</p>
          </div>
        )}

        {!loading && (
          <div className="space-y-6">
            {/* Advisor Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium uppercase tracking-wider opacity-80">
                Select Advisor
              </label>
              <div className={`relative rounded-lg transition-all ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <select
                  className={`w-full p-3 pr-8 appearance-none rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
                  value={selectedAdvisorId}
                  onChange={(e) => setSelectedAdvisorId(e.target.value)}
                >
                  <option value="">Select an advisor</option>
                  {advisors.map((advisor) => (
                    <option key={advisor._id} value={advisor._id}>
                      {advisor.userName} — {advisor.email}
                    </option>
                  ))}
                </select>
                <div className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Student Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium uppercase tracking-wider opacity-80">
                Select Approved Student
              </label>
              <div className={`relative rounded-lg transition-all ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <select
                  className={`w-full p-3 pr-8 appearance-none rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                >
                  <option value="">Select a student</option>
                  {approvedUsers.map((user) => (
                    <option key={user.applicantId._id} value={user.applicantId._id}>
                      {user.firstName} {user.lastName} — {user.university}
                    </option>
                  ))}
                </select>
                <div className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium uppercase tracking-wider opacity-80">
                  Start Date
                </label>
                <div className={`relative rounded-lg transition-all ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
                  />
                  <div className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium uppercase tracking-wider opacity-80">
                  End Date
                </label>
                <div className={`relative rounded-lg transition-all ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
                  />
                  <div className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Messages */}
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 flex items-start space-x-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {message && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 flex items-start space-x-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleAssign}
              disabled={loading}
              className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Assigning Advisor...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className='font-sans'>Assign Advisor</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assigning;