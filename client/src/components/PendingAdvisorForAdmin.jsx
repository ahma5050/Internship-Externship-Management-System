import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
  Avatar,
  Modal,
} from "flowbite-react";
import {
  HiCheckCircle,
  HiXCircle,
  HiOutlineMail,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineUserAdd,
} from "react-icons/hi";
import { ThemContext } from "../context/ThemContext";
import { FaQuoteRight } from "react-icons/fa";

const PendingAdvisorForAdmin = () => {
  const [pendingAdvisors, setPendingAdvisors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { darkMode } = useContext(ThemContext);
  const AdminId = localStorage.getItem("AdminId");
  const advisorId = localStorage.getItem("advisorId");

  const defaultProfileImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const fetchPendingAdvisors = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/AuthRoute/pendingAdvisor");
      const data = await res.json();
      setPendingAdvisors(data);
    } catch (err) {
      setError("Failed to fetch pending advisors");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (advisorId) => {
    setActionLoading(advisorId);
    try {
      const res = await fetch("/api/AuthRoute/approveAdvisor", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ advisorId, AdminId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Approval failed");
      }

      fetchPendingAdvisors();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
      setShowModal(false);
    }
  };

  useEffect(() => {
    fetchPendingAdvisors();
  }, []);

  const openAdvisorModal = (advisor) => {
    setSelectedAdvisor(advisor);
    setShowModal(true);
  };

  return (
    <div
      className={` mt-10 max-w-7xl mx-auto ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
        <Card className={`mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
    <div className="flex flex-col md:flex-row items-center justify-between">
             <div className="flex items-center mb-4 md:mb-0">
               <div className={`p-3 rounded-full ${darkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-800'} mr-4`}>
                 <HiOutlineUserAdd className="h-6 w-6" />
               </div>
               <div>
                 <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                 Advisor Approvals
                 </h2>
                 <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                 Manage pending user registrations
                 </p>
               </div>
             </div>
             <div className="flex items-center">
               <FaQuoteRight size={30} className={darkMode ? "text-teal-400" : "text-teal-600"} />
               <Badge color={darkMode ? "indigo" : "blue"} className="ml-3">
                 {pendingAdvisors.length} Pending
               </Badge>
             </div>
           </div>
           </Card>

      {error && (
        <Alert color="failure" className="mb-6" icon={HiXCircle}>
          <span className="font-medium">Error!</span> {error}
        </Alert>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Spinner size="xl" color={darkMode ? "purple" : "success"} />
          <p className={`mt-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Loading pending advisors...
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pendingAdvisors.length === 0 ? (
            <Card
              className={`col-span-full text-center py-12 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                  darkMode ? "bg-gray-700" : "bg-green-100"
                }`}
              >
                <HiCheckCircle
                  className={`h-6 w-6 ${
                    darkMode ? "text-green-400" : "text-green-600"
                  }`}
                />
              </div>
              <h3
                className={`mt-4 text-lg font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                All caught up!
              </h3>
              <p
                className={`mt-2 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No pending advisor approvals at this time.
              </p>
            </Card>
          ) : (
            pendingAdvisors.map((advisor) => (
              <Card
                key={advisor._id}
                className={`hover:shadow-lg transition-shadow duration-200 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar
                      img={
                        advisor.profile &&
                        advisor.profile !== defaultProfileImage
                          ? `http://localhost:3000${advisor.profile}`
                          : undefined
                      }
                      alt={advisor.userName}
                      rounded
                      size="lg"
                      placeholderInitials={advisor.userName?.[0]?.toUpperCase()}
                      className={`${
                        darkMode ? "ring-gray-700" : "ring-gray-200"
                      } ring-2`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2
                      className={`text-lg font-bold truncate ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {advisor.userName || "Unknown"}
                    </h2>
                    <div className="flex items-center text-sm mt-1">
                      <HiOutlineMail
                        className={`mr-1.5 h-4 w-4 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <span
                        className={`truncate ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {advisor.email}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge
                        color={darkMode ? "indigo" : "blue"}
                        icon={HiOutlineShieldCheck}
                        className={`${darkMode ? "bg-gray-700" : "bg-blue-50"}`}
                      >
                        {advisor.roles}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <Button
                    gradientDuoTone={darkMode ? "purpleToBlue" : "tealToLime"}
                    onClick={() => openAdvisorModal(advisor)}
                    disabled={actionLoading === advisor._id}
                    className="flex-1"
                  >
                    {actionLoading === advisor._id ? (
                      <Spinner size="sm" className="mr-2" />
                    ) : (
                      <HiCheckCircle className="mr-2 h-5 w-5" />
                    )}
                    Approve
                  </Button>
                  <Button
                    color={darkMode ? "gray" : "light"}
                    onClick={() => openAdvisorModal(advisor)}
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

      {/* Advisor Approval Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size="md">
        <Modal.Header
          className={
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }
        >
          <h3
            className={`text-lg font-medium ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Advisor Details
          </h3>
        </Modal.Header>
        <Modal.Body className={darkMode ? "bg-gray-800" : "bg-white"}>
          {selectedAdvisor && (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <Avatar
                  img={
                    selectedAdvisor.profile &&
                    selectedAdvisor.profile !== defaultProfileImage
                      ? `http://localhost:3000${selectedAdvisor.profile}`
                      : undefined
                  }
                  alt={selectedAdvisor.userName}
                  rounded
                  size="xl"
                  placeholderInitials={selectedAdvisor.userName?.[0]?.toUpperCase()}
                  className={`mb-4 ${
                    darkMode ? "ring-gray-700" : "ring-gray-200"
                  } ring-2`}
                />
                <h3
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {selectedAdvisor.userName || "Unknown"}
                </h3>
                <p
                  className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  {selectedAdvisor.email}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Role
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {selectedAdvisor.roles}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Status
                  </p>
                  <Badge
                    color="yellow"
                    icon={HiOutlineClock}
                    className="inline-flex"
                  >
                    Pending
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer
          className={
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }
        >
          <Button
            gradientDuoTone={darkMode ? "purpleToBlue" : "tealToLime"}
            onClick={() => handleApprove(selectedAdvisor?._id)}
            disabled={actionLoading === selectedAdvisor?._id}
          >
            {actionLoading === selectedAdvisor?._id ? (
              <Spinner size="sm" className="mr-2" />
            ) : (
              <HiCheckCircle className="mr-2 h-5 w-5" />
            )}
            Confirm Approval
          </Button>
          <Button
            color={darkMode ? "gray" : "light"}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PendingAdvisorForAdmin;
