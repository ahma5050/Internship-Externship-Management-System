import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Spinner, Alert, Table, Footer, Tooltip } from 'flowbite-react';
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { ThemContext } from "../context/ThemContext";

const PendingAdvisorForAdmin = () => {
  const [pendingAdvisors, setPendingAdvisors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const { darkMode } = useContext(ThemContext);
  const AdminId = localStorage.getItem('AdminId');
  const advisorId = localStorage.getItem('advisorId');

  const fetchPendingAdvisors = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/AuthRoute/pendingAdvisor');
     
      const data = await res.json();
      setPendingAdvisors(data);
    } catch (err) {
      setError('Failed to fetch pending advisors');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (advisorId) => {
    setActionLoading(advisorId);
    try {
      const res = await fetch('/api/AuthRoute/approveAdvisor', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ advisorId, AdminId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Approval failed');
      }

      fetchPendingAdvisors();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchPendingAdvisors();
  }, []);
  const defaultProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div className={`mt-12`}>
      <Card className={`rounded-xl shadow-2xl mt-8 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 '}`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold font-serif ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Pending Advisor Approvals
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Review and approve newly registered advisors
            </p>
          </div>
        </div>

        {error && (
          <Alert color="failure" className="mb-6" icon={HiXCircle}>
            <span className="font-medium">Error!</span> {error}
          </Alert>
        )}

        <div className={`overflow-x-auto rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Table hoverable className={darkMode ? 'bg-gray-800' : 'bg-white'}>
            <Table.Head className={darkMode ? 'bg-gray-700 text-teal-400' : 'bg-gray-100 text-teal-600'}>
              <Table.HeadCell className="py-4">Advisor</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell className="text-right flex justify-end mr-5">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {loading ? (
                <Table.Row className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                  <Table.Cell colSpan={3} className="py-12 text-center">
                    <Spinner size="xl" color={darkMode ? "info" : "success"} />
                    <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Loading pending advisors...
                    </p>
                  </Table.Cell>
                </Table.Row>
              ) : pendingAdvisors.length > 0 ? (
                pendingAdvisors.map((advisor) => (
                  <Table.Row
                    key={advisor._id}
                    className={darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 '}
                  >
                    <Table.Cell className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <div className="flex items-center space-x-3">
                      <div className="w-[40px] h-[40px] overflow-hidden bg-gray-300 relative  rounded-full ">
                {advisor.profile === defaultProfileImage || !advisor.profile ? (
                  <div className="flex items-center justify-center w-full h-full bg-gray-300 text-white text-xl font-bold ">
                    <span className="text-pink-700 mb-1">{advisor.userName?.[0]?.toUpperCase()}</span>
                  </div>
                ) : (
                  <img
                    src={`http://localhost:3000${advisor.profile}`}
                    alt={advisor.userName}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = defaultProfileImage;
                    }}
                  />
                )}
              </div>
                    <span>{advisor.userName || 'Unknown'}</span>

                      </div>
                    </Table.Cell>
                    <Table.Cell className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {advisor.email}
                    </Table.Cell>
                    <Table.Cell className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {advisor.roles}
                    </Table.Cell>
                    <Table.Cell className="text-right">
  <div className="flex justify-end">
    <Button
      size="xs"
      gradientDuoTone={darkMode ? "purpleToBlue" : "tealToLime"}
      onClick={() => handleApprove(advisor._id)}
      disabled={actionLoading === advisor._id}
    >
      {actionLoading === advisor._id ? (
        <Spinner size="sm" />
      ) : (
        <>
          <HiCheckCircle className="mr-2 h-4 w-4" />
          Approve
        </>
      )}
    </Button>
  </div>
</Table.Cell>

                  </Table.Row>
                ))
              ) : (
                <Table.Row
  className={`transition-colors duration-200 w-full ${
    darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
  }`}
>
  <Table.Cell colSpan={4} className="py-12 text-center">
    <div className="w-full">
      <div className="flex flex-col items-center justify-center">
        <HiCheckCircle
          className={`h-12 w-12 mb-4 ${
            darkMode ? 'text-gray-600' : 'text-gray-400'
          }`}
        />
        <p
          className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          All clear!
        </p>
        <p
          className={`text-sm ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          No pending advisor approvals at this time.
        </p>
      </div>
    </div>
  </Table.Cell>
</Table.Row>

              )}
            </Table.Body>
          </Table>
        </div>

        <div className={`flex justify-between items-center mt-6 pt-4 border-t 
          ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
          <div className="mb-2 md:mb-0">
            <span className="font-medium">{pendingAdvisors.length}</span> pending approval{pendingAdvisors.length !== 1 ? 's' : ''}
          </div>
          <div className="text-center font-serif text-white">
            <Footer.Copyright href="#" by="Kelem Meda" year={new Date().getFullYear()} className="text-white text-md" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PendingAdvisorForAdmin;
