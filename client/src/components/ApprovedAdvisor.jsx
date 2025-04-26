import React, { useEffect, useState, useContext } from 'react';
import { Card, Table, Spinner, Alert } from 'flowbite-react';
import { HiOutlineUserCircle, HiXCircle } from 'react-icons/hi';
import { ThemContext } from '../context/ThemContext';

const ApprovedAdvisor = () => {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { darkMode } = useContext(ThemContext);

  const fetchApprovedAdvisors = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/AuthRoute/approved-advisors', {
        method: 'GET',
        credentials: 'include',
      });
      
      const data = await res.json();
     
      if (!res.ok) throw new Error(data.message || 'Failed to fetch advisors');
      setAdvisors(data.advisors);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedAdvisors();
  }, []);

  return (
    <div className="mt-10">
      <Card className={`shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-4">Approved Advisors</h2>

        {error && (
          <Alert color="failure" icon={HiXCircle} className="mb-4">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Spinner size="xl" />
          </div>
        ) : advisors.length > 0 ? (
          <Table hoverable>
          <Table.Head className={darkMode ? 'bg-gray-700 text-teal-400' : 'bg-gray-100 text-teal-600'}>
  <Table.HeadCell>Advisor Name</Table.HeadCell>
  <Table.HeadCell>Advisor Email</Table.HeadCell>
  <Table.HeadCell>Approved By</Table.HeadCell>
</Table.Head>

<Table.Body className={darkMode ? 'divide-gray-700' : 'divide-gray-200'}>
  {advisors.map((advisor) => (
    <Table.Row key={advisor._id}>
      <Table.Cell className="flex items-center space-x-2">
        <HiOutlineUserCircle className="h-5 w-5" />
        <span>{advisor.userName}</span>
      </Table.Cell>
      <Table.Cell>{advisor.email}</Table.Cell>
      <Table.Cell>
        {advisor.approvedBy ? (
          <>
            <p className="font-medium">{advisor.approvedBy.userName}</p>
            <p className="text-sm text-gray-500">{advisor.approvedBy.email}</p>
          </>
        ) : (
          <span className="text-red-500">Unknown</span>
        )}
      </Table.Cell>
    </Table.Row>
  ))}
</Table.Body>

          </Table>
        ) : (
          <p className="text-center py-8 text-gray-500">No approved advisors yet.</p>
        )}
      </Card>
    </div>
  );
};

export default ApprovedAdvisor;
