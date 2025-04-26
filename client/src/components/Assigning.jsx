import React, { useEffect, useState } from 'react';

const Assigning = () => {
  const [advisors, setAdvisors] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [selectedAdvisorId, setSelectedAdvisorId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchApprovedAdvisors = async () => {
      try {
        const res = await fetch('/api/AuthRoute/approved-advisors', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        setAdvisors(data.advisors || []);
      } catch (error) {
        console.error('Failed to fetch advisors:', error);
      }
    };

    const fetchApprovedUsers = async () => {
      try {
        const res = await fetch('/api/applicationRoute/approved-all', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        setApprovedUsers(data || []);
      } catch (error) {
        console.error('Failed to fetch approved users:', error);
      }
    };

    fetchApprovedAdvisors();
    fetchApprovedUsers();
  }, []);

  const handleAssign = async () => {
    const adminId = localStorage.getItem('adminId');
    if (!selectedAdvisorId || !selectedUserId || !adminId) {
      return alert('Please select an advisor, user, and ensure admin is logged in.');
    }

    try {
      const res = await fetch('/api/advisorAssignmentRoute/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ advisorId: selectedAdvisorId, userId: selectedUserId, adminId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Assignment failed');
      setMessage('Advisor assigned successfully!');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-800 shadow rounded-lg space-y-4">
      <h2 className="text-2xl font-semibold">Assign Advisor to Approved Student</h2>

      <select
        className="w-full p-2 border rounded bg-gray-800"
        value={selectedAdvisorId}
        onChange={(e) => setSelectedAdvisorId(e.target.value)}
      >
        <option value="">Select Advisor</option>
        {advisors.map((advisor) => (
          <option key={advisor._id} value={advisor._id}>
            {advisor.userName} - {advisor.email}
          </option>
        ))}
      </select>

      <select
        className="w-full p-2 border rounded bg-gray-800"
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="">Select Approved Student</option>
        {approvedUsers.map((user) => (
          <option key={user.applicantId._id} value={user.applicantId._id}>
            {user.studentName} - {user.companyName}
          </option>
        ))}
      </select>

      <button
        onClick={handleAssign}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Assign Advisor
      </button>

      {message && <div className="text-green-600 mt-2">{message}</div>}
    </div>
  );
};

export default Assigning;
