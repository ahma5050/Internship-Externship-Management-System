import React, { useEffect, useState } from 'react';
import { Table, Spinner, Button, Alert } from 'flowbite-react';
import { HiOutlineUserAdd, HiCheckCircle, HiXCircle } from 'react-icons/hi';

const ApprovedUserbyAdmin = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  console.log("Pending Users:", pendingUsers);  

  // Fetch pending users from the backend
  const fetchPendingUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/AuthRoute/pending-user-admin", {  // Adjust API route accordingly
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
     
      const data = await response.json();
      console.log(data);
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

  // Approve user
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
      setPendingUsers((prev) => prev.filter((user) => user._id !== userId)); // Remove approved user from list
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Pending User Approvals</h1>

      {error && (
        <Alert color="failure" icon={HiXCircle}>
          <span className="font-medium">Error!</span> {error}
        </Alert>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <Spinner size="xl" />
          <p className="ml-2 text-gray-500">Loading pending users...</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
              <Table.HeadCell>applicationStatus</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {pendingUsers.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={4} className="text-center py-12">
                    <HiCheckCircle className="h-12 w-12 text-teal-500" />
                    <p>No pending user approvals</p>
                  </Table.Cell>
                </Table.Row>
              ) : (
                pendingUsers.map((user) => (
                  <Table.Row key={user._id}>
                    <Table.Cell>
                      <div className="flex items-center">
                        <span>{user.userName}</span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.roles}</Table.Cell>
                    <Table.Cell className="text-right">
                      <Button
                        size="xs"
                        gradientDuoTone="tealToLime"
                        onClick={() => handleApprove(user._id)}
                        disabled={actionLoading === user._id}
                      >
                        {actionLoading === user._id ? (
                          <Spinner size="sm" />
                        ) : (
                          <span>Approve</span>
                        )}
                      </Button>
                    </Table.Cell>
                    <Table.Cell>{user.applicationStatus}</Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ApprovedUserbyAdmin;
