import React, { useContext, useEffect, useState } from 'react';
import { Card, Avatar, Badge, Button, Spinner, Alert, Modal } from 'flowbite-react';
import { HiOutlineUserAdd, HiCheck, HiX, HiOutlineMail, HiOutlineShieldCheck, HiOutlineClock, HiCheckCircle } from 'react-icons/hi';
import { FaQuoteRight } from 'react-icons/fa';
import { ThemContext } from '../context/ThemContext';

const ApprovedUserbyAdmin = () => {
    const { darkModehandle, darkMode } = useContext(ThemContext);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchPendingUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/AuthRoute/pending-user-admin", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
     
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error fetching users");
      setPendingUsers(data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId) => {
    setActionLoading(userId);
    try {
      const response = await fetch(`/api/AuthRoute/Approving-user-admin/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error approving user");
      setPendingUsers(prev => prev.filter(user => user._id !== userId));
      toast.success('User approved successfully!');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setActionLoading(null);
      setShowModal(false);
    }
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="mt-10 max-w-7xl mx-auto">
     <Card className={`mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
 <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className={`p-3 rounded-full ${darkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-800'} mr-4`}>
              <HiOutlineUserAdd className="h-6 w-6" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              User Approvals
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage pending user registrations
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <FaQuoteRight size={30} className={darkMode ? "text-teal-400" : "text-teal-600"} />
            <Badge color={darkMode ? "indigo" : "blue"} className="ml-3">
              {pendingUsers.length} Pending
            </Badge>
          </div>
        </div>
        </Card>

      {error && (
        <Alert color="failure" className="mb-6">
          <span className="font-medium">Error!</span> {error}
        </Alert>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Spinner size="xl" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading pending users...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pendingUsers.length === 0 ? (
            <Card className="col-span-full text-center py-12">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <HiCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">All caught up!</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                No pending user approvals at this time.
              </p>
            </Card>
          ) : (
            pendingUsers.map((user) => (
              <Card key={user._id} className="hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center space-x-4">
                  <Avatar
                    img={`https://ui-avatars.com/api/?name=${user.userName}&background=random`}
                    rounded
                    size="lg"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                      {user.userName}
                    </h2>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <HiOutlineMail className="mr-1.5 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <Badge color="indigo" icon={HiOutlineShieldCheck}>
                        {user.roles}
                      </Badge>
                      <Badge color="yellow" icon={HiOutlineClock} className="ml-2">
                        {user.applicationStatus}
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
                    color="gray"
                    onClick={() => openUserModal(user)}
                    className="flex-1"
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
        <Modal.Header>Confirm Approval</Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar
                  img={`https://ui-avatars.com/api/?name=${selectedUser.userName}&background=random`}
                  rounded
                  size="lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedUser.userName}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</p>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedUser.roles}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedUser.applicationStatus}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
          gradientDuoTone={darkMode ? "purpleToBlue" : "tealToLime"}
            onClick={() => handleApprove(selectedUser?._id)}
            disabled={actionLoading === selectedUser?._id}
          >
            {actionLoading === selectedUser?._id ? (
              <Spinner size="sm" className="mr-2" />
            ) : (
              <HiCheckCircle className="mr-2 h-5 w-5" />
            )}
            Confirm Approval
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ApprovedUserbyAdmin;