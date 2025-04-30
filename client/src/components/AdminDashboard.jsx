import React, { useEffect, useState, useContext } from "react";
import { Card, Table, Button, Spinner, Alert, Dropdown, Tooltip, Footer } from "flowbite-react";
import { 
  HiOutlineUserAdd, 
  HiCheckCircle, 
  HiXCircle, 
  HiOutlineSun, 
  HiOutlineMoon,
  HiOutlineRefresh,
  HiOutlineCog,
  HiOutlineBell,
  HiOutlineUserCircle
} from "react-icons/hi";
import { ThemContext } from "../context/ThemContext";
import { FaQuoteRight } from "react-icons/fa";
import PendingAdvisorForAdmin from "./PendingAdvisorForAdmin";
import ApprovedUserbyAdmin from "./ApprovedUserbyAdmin";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
   const { darkModehandle, darkMode } = useContext(ThemContext);

  // Fetch pending users
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

  // Approve one user
  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/AuthRoute/approve/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      console.log("restttttttt", res)
      const body = await res.json();
      console.log("body", body)
      if (!res.ok) throw new Error(body.message || "Approve failed");
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>

      {/* Luxurious Admin Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Admin Dashboard
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage system users and permissions
          </p>
        </div>
        
      </div>

      {/* Main Dashboard Card */}
      <Card className={`rounded-xl shadow-2xl ${darkMode ? 
        'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 
        'bg-gradient-to-br from-white to-gray-50 border-gray-200'}`}>
        
        {/* Card Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold font-serif flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <HiOutlineUserAdd className={`mr-2 h-9 w-9 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
              Pending faculty Approvals
            </h2>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Review and approve new user registrations
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-3">
          <FaQuoteRight size={40}/>
          </div>
        </div>

        {error && (
          <Alert color="failure" className="mb-6" icon={HiXCircle}>
            <span className="font-medium">Error!</span> {error}
          </Alert>
        )}

        {/* Users Table */}
        <div className={`overflow-x-auto rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Table hoverable className={darkMode ? 'bg-gray-800' : 'bg-white'}>
            <Table.Head className= {darkMode ? 'bg-gray-700 text-teal-400' : 'bg-gray-100 text-teal-600'}>
              <Table.HeadCell className="py-4">User</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell className="text-right">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {loading && users.length === 0 ? (
                <Table.Row className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                  <Table.Cell colSpan={4} className="py-12 text-center">
                    <Spinner size="xl" color={darkMode ? "info" : "success"} />
                    <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Loading pending users...
                    </p>
                  </Table.Cell>
                </Table.Row>
              ) : users.length > 0 ? (
                users.map((u) => (
                  <Table.Row 
                    key={u._id} 
                    className={darkMode ? 
                      'bg-gray-800 hover:bg-gray-700' : 
                      'bg-white hover:bg-gray-50'}
                  >
                    <Table.Cell className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center 
                          ${darkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-800'}`}>
                          {u.userName.charAt(0).toUpperCase()}
                        </div>
                        <span>{u.userName}</span>
                      </div>
                    </Table.Cell>
                    <Table.Cell className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {u.email}
                    </Table.Cell>
                    <Table.Cell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${darkMode ? 'bg-gray-600 text-teal-300' : 'bg-teal-100 text-teal-800'}`}>
                        {u.roles}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      <Button
                        size="xs"
                        gradientDuoTone={darkMode ? "purpleToBlue" : "tealToLime"}
                        onClick={() => handleApprove(u._id)}
                        disabled={actionLoading === u._id}
                        className="ml-auto flex items-center"
                      >
                        {actionLoading === u._id ? (
                          <Spinner size="sm" />
                        ) : (
                          <>
                            <HiCheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </>
                        )}
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                  <Table.Cell colSpan={4} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <HiCheckCircle className={`h-12 w-12 mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                      <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        All clear!
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        No pending user approvals at this time.
                      </p>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>

        {/* Card Footer */}
        <div className={`flex flex-col md:flex-row md:justify-between md:items-center mt-6 pt-4 border-t 
          ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
          <div className="mb-2 md:mb-0">
            <span className="font-medium">{users.length}</span> pending approval{users.length !== 1 ? 's' : ''}
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center font-serif text-white"><Footer.Copyright href="#" by="Kelem Meda" year={new Date().getFullYear()} className="text-white text-md "/></div>
            <Tooltip content="Settings">
              <button className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              </button>
            </Tooltip>
          </div>
        </div>
      </Card>
      <PendingAdvisorForAdmin />
      <ApprovedUserbyAdmin />
 
    </div>
  );
};


export default AdminDashboard;