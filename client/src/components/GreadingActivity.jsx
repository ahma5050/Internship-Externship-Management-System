import React, { useState, useEffect, useContext } from 'react';
import { Select, TextInput, Textarea, Label, Button, Alert } from 'flowbite-react';
import { WeekPicker } from '../components/WeekPicker';
import { ThemContext } from '../context/ThemContext';

const EvaluationPage = () => {
    const { darkModehandle, darkMode } = useContext(ThemContext);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [weekRange, setWeekRange] = useState({
    start: null,
    end: null
  });
  console.log('selectedStudent.applicantId', selectedStudent?.applicantId);  
  console.log('approvedUsersapprovedUsersapprovedUsers', selectedStudent);  
  const [weeklyPerformance, setWeeklyPerformance] = useState({
    teamwork: '',
    initiative: '',
    focus: '',
    reporting: '',
    communication: '',
    punctuality: '',
    discipline: '',
    growth: ''
  });
  const [projectEvaluation, setProjectEvaluation] = useState({
    title: '',
    status: '',
    progress: '',
    deadline: '',
    remarks: ''
  });
  const [overallGrade, setOverallGrade] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchApprovedUsers = async () => {
      try {
        const facultyId = localStorage.getItem("facultyId");
        const res = await fetch(`/api/applicationRoute/approved?facultyId=${facultyId}`);
        
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data = await res.json();
        setApprovedUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchApprovedUsers();
  }, []);

  const handlePerformanceChange = (e) => {
    const { name, value } = e.target;
    setWeeklyPerformance(prev => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectEvaluation(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      setSuccess(false);
      
      const facultyId = localStorage.getItem("facultyId");
      if (!facultyId) throw new Error('Faculty ID not found');
      if (!weekRange.start || !weekRange.end) throw new Error('Please select a week');
      
      const payload = {
        facultyId,
        studentId: selectedStudent.applicantId,
        weekStartDate: weekRange.start.toISOString(),
        weekEndDate: weekRange.end.toISOString(),
        weeklyPerformance: {
          teamwork: Number(weeklyPerformance.teamwork),
          initiative: Number(weeklyPerformance.initiative),
          focus: Number(weeklyPerformance.focus),
          reporting: Number(weeklyPerformance.reporting),
          communication: Number(weeklyPerformance.communication),
          punctuality: Number(weeklyPerformance.punctuality),
          discipline: Number(weeklyPerformance.discipline),
          growth: Number(weeklyPerformance.growth)
        },
        
        projectEvaluation: {
          title: projectEvaluation.title,
          status: projectEvaluation.status,
          progress: Number(projectEvaluation.progress),
          deadline: projectEvaluation.deadline,
          remarks: projectEvaluation.remarks
        },
        overallGrade: Number(overallGrade)
      };

      const response = await fetch('/api/evaluationRoute/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload),
      });
      console.log('Response:wwwwwwwwww', response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }

      // Reset form
      setSelectedStudent(null);
      setWeekRange({ start: null, end: null });
      setWeeklyPerformance({
        teamwork: '',
        initiative: '',
        focus: '',
        reporting: '',
        communication: '',
        punctuality: '',
        discipline: '',
        growth: ''
      });
      setProjectEvaluation({
        title: '',
        status: '',
        progress: '',
        deadline: '',
        remarks: ''
      });
      setOverallGrade('');
      if (!weekRange.start || !weekRange.end || isNaN(weekRange.start.getTime()) || isNaN(weekRange.end.getTime())) {
        throw new Error('Please select a valid week');
      }
      
      setSuccess('Weekly evaluation submitted successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading approved students...</div>;
  if (error) return <Alert color="failure" className="m-4">Error: {error}</Alert>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold mb-4">Weekly Student Evaluation</h2>

      {success && <Alert color="success" onDismiss={() => setSuccess(false)}>{success}</Alert>}

      {/* Student Selection */}
      <div>
        <Label htmlFor="student">Select Student</Label>
        <Select
          id="student"
          value={selectedStudent?._id || ''}
          onChange={(e) => setSelectedStudent(approvedUsers.find(s => s._id === e.target.value) || null)}
          required
         
        >
          <option value="">Select a student</option>
          {approvedUsers.map(student => (
            <option key={student._id} value={student._id}>
              {student.firstName} {student.lastName} ({student.email})
            </option>
          ))}
        </Select>
      </div>

      {/* Week Selection */}
      <div>
        <Label>Evaluation Week</Label>
        <WeekPicker 
          onWeekSelect={(start, end) => setWeekRange({ start, end })} 
        />
    
{weekRange.start && weekRange.end && (
  <p className="mt-2 text-gray-600">
    Selected Week: {weekRange.start.toLocaleDateString()} to {weekRange.end.toLocaleDateString()}
  </p>
)}
      </div>

      {/* Weekly Performance */}
      <section className={`p-6 max-w-6xl mx-auto space-y-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}> 
        <h3 className="text-xl font-semibold mb-4">Weekly Performance (0-10)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(weeklyPerformance).map(([field, value]) => (
            <div key={field}>
              <Label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <TextInput
                type="number"
                name={field}
                value={value}
                min="0"
                max="10"
                onChange={handlePerformanceChange}
                required
              />
            </div>
          ))}
        </div>
      </section>

      {/* Project Evaluation */}
      <section className={`p-6 max-w-6xl mx-auto space-y-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <h3 className="text-xl font-semibold mb-4">Project Evaluation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Project Title</Label>
            <TextInput
              name="title"
              value={projectEvaluation.title}
              onChange={handleProjectChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              value={projectEvaluation.status}
              onChange={handleProjectChange}
              required
            >
              <option value="">Select status</option>
              <option value="created">Created</option>
              <option value="ongoing">Ongoing</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="progress">Progress (%)</Label>
            <TextInput
              type="number"
              name="progress"
              value={projectEvaluation.progress}
              min="0"
              max="100"
              onChange={handleProjectChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="deadline">Deadline</Label>
            <TextInput
              type="date"
              name="deadline"
              value={projectEvaluation.deadline}
              onChange={handleProjectChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              name="remarks"
              rows={3}
              value={projectEvaluation.remarks}
              onChange={handleProjectChange}
            />
          </div>
        </div>
      </section>

      {/* Overall Grade */}
      <section cclassName={`p-6 max-w-6xl mx-auto space-y-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <h3 className="text-xl font-semibold mb-4">Overall Weekly Grade (0-100)</h3>
        <div className="w-full md:w-1/2">
          <TextInput
            type="number"
            value={overallGrade}
            min="0"
            max="100"
            onChange={(e) => setOverallGrade(e.target.value)}
            required
          />
        </div>
      </section>

      <Button
        color="blue"
        onClick={handleSubmit}
        disabled={!selectedStudent || !weekRange.start || !weekRange.end}
        className="w-full md:w-auto"
      >
        Submit Weekly Evaluation
      </Button>
    </div>
  );
};

export default EvaluationPage;