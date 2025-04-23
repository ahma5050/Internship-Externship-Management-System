import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Spinner } from "flowbite-react";
import { HiOutlineEye } from "react-icons/hi";
import { ThemContext } from "../context/ThemContext";

const ApprovalProcess = () => {
  const { darkMode } = useContext(ThemContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
 
 
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const facultyId = localStorage.getItem("facultyId");
        console.log("Fetching with facultyId:", facultyId);
        
        const res = await fetch(`/api/applicationRoute?status=pending&facultyId=${facultyId}`);
        console.log("res.............", res);
        
        // Check if the response is OK
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
    
        const data = await res.json();
       
    
        // Ensure it's an array
        if (Array.isArray(data)) {
          setApplications(data);
        } else {
          console.error("Expected an array but got:", data);
          setApplications([]);  // Fallback
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);  // Fallback
      } finally {
        setLoading(false);
      }
    };
    
  
    fetchApplications();
  }, []);
  
  

  const handleApproval = async (id, action) => {
    setProcessingId(id);
  
    try {
      const res = await fetch(`/api/applicationRoute/${id}/${action}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          facultyId: localStorage.getItem("facultyId"), // Replace this with the actual logged-in faculty's ID
        }),
      });
  
      const data = await res.json();
      console.log("dataddddddd", data)
  
      if (!res.ok) throw new Error(data.message || "Action failed");
  
      setApplications((prev) => prev.filter((app) => app._id !== id));
  
      if (selectedApp && selectedApp._id === id) {
        setSelectedApp(null);
      }
    } catch (error) {
      alert(`Failed to ${action} application: ` + error.message);
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejection = async (id, action) => {
    setProcessingId(id);  // Set the processing state to show a loading spinner or indicator for the selected application
  
    try {
      // Send the rejection request to the backend
      const res = await fetch(`/api/applicationRoute/${id}/${action}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          facultyId: localStorage.getItem("facultyId"), // Replace with actual logged-in faculty's ID
        }),
      });
  
      const data = await res.json();
      console.log("Rejection Response:", data);  // Log the response from the backend
  
      if (!res.ok) throw new Error(data.message || "Action failed");
  
      // If rejection is successful, update the applications state
      setApplications((prev) => prev.filter((app) => app._id !== id));
  
      // If the rejected application is selected, clear the selected app
      if (selectedApp && selectedApp._id === id) {
        setSelectedApp(null);
      }
    } catch (error) {
      alert(`Failed to ${action} application: ` + error.message);  // Show error alert if the request fails
    } finally {
      setProcessingId(null);  // Reset the processing state once the action is complete
    }
  };
  
  

  const handlePage = (app) => setSelectedApp(app);
  const handleClosePage = () => setSelectedApp(null);

  if (loading) {
    return (
      <div className="flex justify-center mt-72 items-center gap-3">
        <Spinner size="xl" />
        <span>Loading.....</span>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "dark" : ""} px-4 max-w-8xl mx-auto`}>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Faculty Approval Panel
      </h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No pending applications.
        </p>
      ) : (
        <div className="grid gap-6">
          {applications?.map((app) => (
            <Card key={app._id} className="bg-white dark:bg-gray-800">
              <div className="md:flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {app.firstName} {app.lastName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{app.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    color="success"
                    isProcessing={processingId === app._id}
                    onClick={() => handleApproval(app._id, "approve")}
                  >
                    Approve
                  </Button>
                  <Button
                    color="failure"
                    isProcessing={processingId === app._id}
                    onClick={() => handleApproval(app._id, "reject")}
                  >
                    Reject
                  </Button>
                </div>
              </div>
              <p className="text-gray-800 dark:text-gray-300">
                <strong>University:</strong> {app.university}
              </p>
              <p className="text-gray-800 dark:text-gray-300">
                <strong>Position:</strong> {app.position}
              </p>
              <div className="md:flex items-center justify-between">
                <div className="text-gray-800 dark:text-gray-300">
                  <strong>Motivation:</strong> {app.about}
                </div>
                <Button size="xs" color="gray" onClick={() => handlePage(app)}>
                  <div className="flex items-center font-bold font-serif">
                    <HiOutlineEye className="mr-1" size={22} />
                    <span>View Full Documentation</span>
                  </div>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedApp && (
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-xl rounded-3xl p-4 max-w-8xl mx-auto my-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-center">Application Details</h2>
            <Button size="xs" color="gray" onClick={handleClosePage}>
              Close
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
            <p><strong>ID:</strong> {selectedApp._id}</p>
            <p><strong>First Name:</strong> {selectedApp.firstName}</p>
            <p><strong>Last Name:</strong> {selectedApp.lastName}</p>
            <p><strong>Email:</strong> {selectedApp.email}</p>
            <p><strong>Phone:</strong> {selectedApp.phone}</p>
            <p><strong>University:</strong> {selectedApp.university}</p>
            <p><strong>Degree:</strong> {selectedApp.degree}</p>
            <p><strong>Major:</strong> {selectedApp.major}</p>
            <p><strong>Graduation Year:</strong> {selectedApp.graduationYear}</p>
            <p><strong>Position:</strong> {selectedApp.position}</p>
            <p><strong>Start Date:</strong> {new Date(selectedApp.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(selectedApp.endDate).toLocaleDateString()}</p>
            <p><strong>Duration:</strong> {selectedApp.duration}</p>
            <p><strong>Status:</strong> {selectedApp.status}</p>
            <p><strong>Faculty Approved:</strong> {selectedApp.facultyApproved ? "Yes" : "No"}</p>
            <p><strong>Submitted:</strong> {new Date(selectedApp.createdAt).toLocaleString()}</p>
          </div>

          <div>
            <p><strong>About:</strong> {selectedApp.about}</p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {["resume", "coverLetter", "portfolio"].map((field) => (
              <div key={field}>
                <p className="font-semibold mb-2 text-center">{field.replace(/([A-Z])/g, ' $1')}</p>
                <img
                  src={`http://localhost:3000/uploads/${selectedApp[field]}`}
                  alt={field}
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalProcess;
