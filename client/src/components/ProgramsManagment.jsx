import React, { useEffect, useState, useContext } from 'react';
import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { toast } from 'react-toastify';
import { ThemContext } from '../context/ThemContext';
import { PiStudentBold } from "react-icons/pi";
import { SiNike } from "react-icons/si";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin3Line } from "react-icons/ri";
import { MdMovieEdit } from "react-icons/md";

const ProgramsManagment = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  const { darkMode } = useContext(ThemContext);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch('/api/advisorAssignmentRoute/allassignment', {
          credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch assignments');
        setAssignments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleDelete = async (id) => {
    try {
      const assignment = assignments.find(a => a._id === id);
      if (!assignment) return toast.error("Assignment not found");

      const res = await fetch(`/api/advisorAssignmentRoute/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ studentId: assignment.studentId })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete assignment');

      setAssignments(prev => prev.filter((a) => a._id !== id));
      toast.success('Assignment deleted successfully!');
      setDeleteModal(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const openDeleteModal = (assignment) => {
    setAssignmentToDelete(assignment);
    setDeleteModal(true);
  };

  const openEditModal = (assignment) => {
    setSelectedAssignment({
      ...assignment,
      _id: assignment._id,
      studentEmail: assignment.studentEmail,
      advisorEmail: assignment.advisorEmail,
      startDate: assignment.startDate ? assignment.startDate.split('T')[0] : '',
      endDate: assignment.endDate ? assignment.endDate.split('T')[0] : ''
    });
    setEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/advisorAssignmentRoute/update/${selectedAssignment._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          studentEmail: selectedAssignment.studentEmail,
          advisorEmail: selectedAssignment.advisorEmail,
          startDate: selectedAssignment.startDate,
          endDate: selectedAssignment.endDate
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update assignment');

      setAssignments(prev =>
        prev.map((a) => (a._id === data._id ? data : a))
      );
      toast.success('Assignment updated successfully!');
      setEditModal(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={`p-6 max-w-7xl mx-auto min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold md:text-3xl lg:text-4xl">Advisor Assignment Programs</h1>
      </div>

      {loading && <p className="text-blue-500 text-center">Loading assignments...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && assignments.length === 0 && (
        <p className="text-center text-lg text-gray-500">No advisor assignments found.</p>
      )}

      {!loading && assignments.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {assignments.map((assign) => (
            <div
              key={assign._id}
              className={`rounded-2xl p-6 border shadow-xl hover:shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center justify-between">
                <h2 className="flex py-3 items-center">
                  <PiStudentBold size={30} className='h-9 w-9 dark:bg-cyan-200 p-1 rounded-full text-gray-200 dark:text-gray-950 bg-blue-600' />
                  <span className="px-3 text-xl font-bold">{assign.studentName}</span>
                </h2>
                {assign.studentStatus === "approved" && (
                  <span className="text-green-500">
                    <SiNike size={28} />
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-300 mb-1">University: {assign.companyName}</p>
              <p className="text-sm text-gray-300 mb-1">Student Email: {assign.studentEmail}</p>
              <p className="text-sm text-gray-300 mb-1">Status: {assign.studentStatus}</p>
              <p className="text-sm text-gray-300 mb-1">Advisor Name: <strong>{assign.advisorName}</strong></p>
              <p className="text-sm text-gray-300 mb-1">Advisor Email: {assign.advisorEmail}</p>
              <p className="text-sm text-gray-300 mb-1">Advisor Status: {assign.advisorstatus}</p>
              <p className="text-sm text-gray-300 mb-4">
                From: <strong>{new Date(assign.startDate).toLocaleDateString()}</strong> →{' '}
                <strong>{new Date(assign.endDate).toLocaleDateString()}</strong>
              </p>

              <div className="flex justify-between items-center gap-2 mt-4">
                <Button color="info" onClick={() => openEditModal(assign)} className="flex items-center gap-2">
                  <FiEdit size={16} /> Edit
                </Button>
                <Button color="failure" onClick={() => openDeleteModal(assign)} className="flex items-center gap-2">
                  <RiDeleteBin3Line size={16} /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal show={editModal} onClose={() => setEditModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleEditSubmit}>
            <div className="space-y-4">
            <span className='flex items-center justify-center'> 
            <MdMovieEdit size={40} className='text-cyan-400'/>
              <h3 className="text-xl font-semibold text-center px-2">Edit Assignment</h3>
</span>
              <div>
                <Label>Student Email</Label>
                <TextInput
                  value={selectedAssignment?.studentEmail || ''}
                  onChange={(e) =>
                    setSelectedAssignment((prev) => ({ ...prev, studentEmail: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <Label>Advisor Email</Label>
                <TextInput
                  value={selectedAssignment?.advisorEmail || ''}
                  onChange={(e) =>
                    setSelectedAssignment((prev) => ({ ...prev, advisorEmail: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <Label>Start Date</Label>
                <TextInput
                  type="date"
                  value={selectedAssignment?.startDate || ''}
                  onChange={(e) =>
                    setSelectedAssignment((prev) => ({ ...prev, startDate: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <Label>End Date</Label>
                <TextInput
                  type="date"
                  value={selectedAssignment?.endDate || ''}
                  onChange={(e) =>
                    setSelectedAssignment((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button color="gray" onClick={() => setEditModal(false)}>Cancel</Button>
                <Button type="submit">Update</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteModal} onClose={() => setDeleteModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <RiDeleteBin3Line className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this assignment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete(assignmentToDelete._id)}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProgramsManagment;