import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card } from 'flowbite-react';
import { HiOutlineEye } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, University, Briefcase } from 'lucide-react';
import { IoCalendarOutline } from "react-icons/io5";
import { SiNike } from "react-icons/si";
import { CgOrganisation } from "react-icons/cg";
import UserNormalpending from './UserNormalpending';

const UserDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  // Fetch pending applications submitted by the user
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const url = `/api/applicationRoute/ApplicantPendingfrouser?status=pending&applicantId=${currentUser._id}`;
        const res = await fetch(url);
        const data = await res.json();
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching pending applications:", err);
        setApplications([]);
      }
    };
    fetchApplications();
  }, [currentUser]);

  // Fetch approved applications submitted by the user
  useEffect(() => {
    const fetchApprovedUsers = async () => {
      try {
        const url = `/api/applicationRoute/ApplicantApprovedforuser?applicantId=${currentUser._id}`;
        const res = await fetch(url);
        const data = await res.json();
        setApprovedUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching approved applications:", err);
      }
    };
    fetchApprovedUsers();
  }, [currentUser]);

  const handlePage = (app) => setSelectedApp(app);
  const handleClosePage = () => setSelectedApp(null);

  return (
    <div className="">
     <UserNormalpending />
     <div className="px-4 max-w-8xl mx-auto">
      {selectedApp ? (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl my-8 text-gray-800 dark:text-gray-200">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold font-serif">Application Details</h2>
            <Button onClick={handleClosePage}>Close</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <p><strong>Full Name:</strong> {selectedApp.firstName} {selectedApp.lastName}</p>
            <p><strong>Email:</strong> {selectedApp.email}</p>
            <p><strong>University:</strong> {selectedApp.university}</p>
            <p><strong>Status:</strong> {selectedApp.status}</p>
            <p><strong>Position:</strong> {selectedApp.position}</p>
            <p><strong>Duration:</strong> {selectedApp.duration}</p>
            <p><strong>Faculty Approved:</strong> {selectedApp.facultyApproved ? 'Yes' : 'No'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            {["resume", "coverLetter", "portfolio"].map(field => (
              <div key={field}>
                <p className="font-semibold">{field}</p>
                <img
                  src={`http://localhost:3000/uploads/${selectedApp[field]}`}
                  onError={(e) => e.target.style.display = 'none'}
                  alt={field}
                  className="h-60 w-full object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      ) : applications.length > 0 ? (
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center">Pending Applications</h1>
          <div className="grid gap-6">
            {applications.map(app => (
              <Card key={app._id} className="bg-white dark:bg-gray-800">
                <div className="md:flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{app.firstName} {app.lastName}</h2>
                    <p className="text-sm text-gray-500">{app.email}</p>
                    <p className="text-sm text-gray-500">{app.university}</p>
                    <p className="text-sm text-gray-500">{app.degree}</p>
                    <p className="text-sm text-gray-500">{app.position}</p>
                    <p className="text-sm text-gray-500">{app.duration}</p>
                    <p className="text-sm text-gray-500">Faculty Approved: {app.facultyApproved ? 'Yes' : 'No'}</p>
                  </div>
                  <p>{app.status}</p>
                </div>
                <Button size="xs" onClick={() => handlePage(app)}>
                  <HiOutlineEye className="mr-1" />
                  View
                </Button>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className=" w-full">
        </div>
      )}
      </div>

     
    </div>
  );
};

export default UserDashboard;
