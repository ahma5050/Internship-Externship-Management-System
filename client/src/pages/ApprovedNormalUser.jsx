import React, { useContext, useEffect, useState } from 'react';
import { Table, Spinner, Alert } from 'flowbite-react';
import { HiXCircle } from 'react-icons/hi';
import { ThemContext } from '../context/ThemContext';

const ApprovedNormalUser = () => {
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const { darkMode } = useContext(ThemContext);

  // Fetch approved users
  const fetchApprovedUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/AuthRoute/approved-user-admin", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error fetching users");
      setApprovedUsers(data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedUsers();
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Approved Users</h1>

      {error && (
        <Alert color="failure" icon={HiXCircle}>
          <span className="font-medium">Error!</span> {error}
        </Alert>
      )}

      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <Spinner size="xl" />
          <p className="ml-2 text-gray-500">Loading approved users...</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>userStatus</Table.HeadCell>
              <Table.HeadCell>applicationStatus</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {approvedUsers.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={3} className="text-center py-12">
                    <p>No approved users found.</p>
                  </Table.Cell>
                </Table.Row>
              ) : (
                approvedUsers.map((user) => (
                  <Table.Row key={user._id} >
                    <Table.Cell>{user.userName}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.roles}</Table.Cell>
                    <Table.Cell>{user.userStatus}</Table.Cell>
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

export default ApprovedNormalUser;
