import React, { useEffect, useState, useContext } from "react";
import { Card, Avatar, Badge, Button, Spinner, Alert, Modal } from "flowbite-react";
import { 
  HiOutlineUserAdd, 
  HiCheck, 
  HiX, 
  HiOutlineMail, 
  HiOutlineShieldCheck, 
  HiOutlineClock,
  HiOutlineRefresh,
  HiOutlineSearch,
  HiCheckCircle,
  HiXCircle, 
  HiOutlineSun, 
  HiOutlineMoon,
  HiOutlineCog,
  HiOutlineBell,
  HiOutlineUserCircle,

} from "react-icons/hi";
import { ThemContext } from "../context/ThemContext";
import { FaQuoteRight, FaUserGraduate, FaUserTie } from "react-icons/fa";
import PendingAdvisorForAdmin from "./PendingAdvisorForAdmin";
import ApprovedUserbyAdmin from "./ApprovedUserbyAdmin";
import {Link} from "react-router-dom";
import { GoOrganization } from "react-icons/go";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { darkMode } = useContext(ThemContext);

  const [stats, setStats] = useState({
    totalFaculty: 0,
    totalAdvisors: 0,
    totalStudents: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/advisorAssignmentRoute/user-counts');
      console.log("Response:000000000000000011", res);
      const data = await res.json();
      console.log("data:000000000000000011", data);
      if (!res.ok) throw new Error(data.message);
      setStats({
        totalFaculty: data.facultyCount,
        totalAdvisors: data.advisorCount,
        totalStudents: data.studentCount
      });
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchPending = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/AuthRoute/pending`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to load");
      setUsers(body.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/AuthRoute/approve/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Approve failed");
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
      setShowModal(false);
    }
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const filteredUsers = users.filter(user => 
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-6 max-w-7xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
            Admin Dashboard
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage system users and permissions
          </p>
        </div>
        
      </div>

      {/* Header Section */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Faculty Card */}
        <Link to='/Dashboard?tab=ApprovedFacality'>
        <Card className={`rounded-xl shadow-lg ${darkMode ? 
          'bg-gradient-to-br from-gray-800 to-gray-700' : 
          'bg-gradient-to-br from-white to-gray-100'}`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${darkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-800'}`}>
              <HiOutlineUserCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Faculty
              </p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {loading ? <Spinner size="sm" /> : stats.totalFaculty}
              </p>
            </div>
          </div>
        </Card>
        </Link>
        
        {/* Advisors Card */}
        <Link to='/Dashboard?tab=ApprovedAdvisor'>
        <Card className={`rounded-xl shadow-lg ${darkMode ? 
          'bg-gradient-to-br from-gray-800 to-gray-700' : 
          'bg-gradient-to-br from-white to-gray-100'}`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
              <FaUserTie className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Advisors
              </p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {loading ? <Spinner size="sm" /> : stats.totalAdvisors}
              </p>
            </div>
          </div>
        </Card>
        </Link>
        {/* Students Card */}
        <Link to='/Dashboard?tab=ApprovedNormalUser'>
        <Card className={`rounded-xl shadow-lg ${darkMode ? 
          'bg-gradient-to-br from-gray-800 to-gray-700' : 
          'bg-gradient-to-br from-white to-gray-100'}`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
              <FaUserGraduate className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Students
              </p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {loading ? <Spinner size="sm" /> : stats.totalStudents}
              </p>
            </div>
          </div>
        </Card>
        </Link>
      </div>

      
    

      {/* Stats Card */}
      <Card className={`mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className={`p-3 rounded-full ${darkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-800'} mr-4`}>
              <GoOrganization className="h-6 w-6" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Pending Faculty Approvals
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Review and approve new user registrations
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <FaQuoteRight size={30} className={darkMode ? "text-teal-400" : "text-teal-600"} />
            <Badge color={darkMode ? "indigo" : "blue"} className="ml-3">
              {users.length} Pending
            </Badge>
          </div>
        </div>
      </Card>

      {error && (
        <Alert color="failure" className="mb-6">
          <span className="font-medium">Error!</span> {error}
        </Alert>
      )}

      {/* Users Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Spinner size="xl" />
          <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Loading pending users...
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.length === 0 ? (
            <Card className="col-span-full text-center py-12">
              <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                <HiCheck className={`h-6 w-6 ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
              </div>
              <h3 className={`mt-4 text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                All caught up!
              </h3>
              <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No pending user approvals at this time.
              </p>
            </Card>
          ) : (
            filteredUsers.map((user) => (
              <Card 
                key={user._id} 
                className={`hover:shadow-lg transition-shadow duration-200 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-center space-x-4">
                  <Avatar
                    img={`https://ui-avatars.com/api/?name=${user.userName}&background=random`}
                    rounded
                    size="lg"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className={`text-lg font-bold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user.userName}
                    </h2>
                    <div className={`flex items-center text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <HiOutlineMail className="mr-1.5 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <Badge 
                        color={darkMode ? "indigo" : "blue"} 
                        icon={HiOutlineShieldCheck}
                        className={darkMode ? "bg-gray-700" : ""}
                      >
                        {user.roles}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <Button
                    gradientDuoTone={darkMode ? "purpleToBlue" : "tealToLime"}
                    onClick={() => openUserModal(user)}
                    disabled={actionLoading === user._id}
                    className="flex-1"
                  >
                    {actionLoading === user._id ? (
                      <Spinner size="sm" className="mr-2" />
                    ) : (
                      <HiCheckCircle className="mr-2 h-5 w-5" />
                    )}
                    Approve
                  </Button>
                  <Button
                    color={darkMode ? "gray" : "light"}
                    onClick={() => openUserModal(user)}
                    className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : ''}`}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* User Approval Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
          Confirm Approval
        </Modal.Header>
        <Modal.Body className={darkMode ? 'bg-gray-800' : ''}>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar
                  img={`https://ui-avatars.com/api/?name=${selectedUser.userName}&background=random`}
                  rounded
                  size="lg"
                />
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedUser.userName}
                  </h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Role</p>
                  <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.roles}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</p>
                  <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Pending Approval</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
          <Button
            gradientDuoTone={darkMode ? "purpleToBlue" : "tealToLime"}
            onClick={() => handleApprove(selectedUser?._id)}
            disabled={actionLoading === selectedUser?._id}
          >
            {actionLoading === selectedUser?._id ? (
              <Spinner size="sm" className="mr-2" />
            ) : (
              <HiCheck className="mr-2 h-5 w-5" />
            )}
            Confirm Approval
          </Button>
          <Button 
            color={darkMode ? "gray" : "light"}
            onClick={() => setShowModal(false)}
            className={darkMode ? 'bg-gray-700 hover:bg-gray-600' : ''}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Additional Components */}
      <PendingAdvisorForAdmin />
      <ApprovedUserbyAdmin />
    </div>
  );
};

export default AdminDashboard;