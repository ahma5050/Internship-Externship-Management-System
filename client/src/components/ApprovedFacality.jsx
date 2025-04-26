import React, { useEffect, useState, useContext } from "react";
import { Card, Spinner, Alert } from "flowbite-react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { ThemContext } from "../context/ThemContext";

const ApprovedFacality = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { darkMode } = useContext(ThemContext);
  const defaultProfileImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const fetchApprovedFaculty = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/AuthRoute/approved-faculty", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to fetch data");

      setFaculty(body.faculty);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedFaculty();
  }, []);

  return (
    <div className={` p-6 max-w-6xl mx-auto ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Approved Faculty Members</h2>

      {error && (
        <Alert color="failure" icon={HiXCircle}>
          <span className="font-medium">Error!</span> {error}
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {loading ? (
          <div className="text-center col-span-full">
            <Spinner size="lg" /> Loading...
          </div>
        ) : faculty.length > 0 ? (
          faculty.map((fac) => (
            <Card key={fac._id} className={`shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
              {/* Profile Image */}
              <div className="w-full h-48 overflow-hidden bg-gray-300 relative  rounded-lg">
                {fac.profile === defaultProfileImage || !fac.profile ? (
                  <div className="flex items-center justify-center w-full h-full bg-gray-300 text-white text-4xl font-bold ">
                    <span className="text-pink-700">{fac.userName?.[0]?.toUpperCase()}</span>
                  </div>
                ) : (
                  <img
                    src={`http://localhost:3000${fac.profile}`}
                    alt={fac.userName}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = defaultProfileImage;
                    }}
                  />
                )}
              </div>

              {/* Faculty Information */}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{fac.userName}</h3>
                <p className="text-sm text-gray-300">Email: {fac.email}</p>
                <p className="text-sm text-gray-300">Role: {fac.roles}</p>
                <div className="mt-2">
                  <span className="px-4 py-1 text-xs bg-teal-100 text-teal-700 rounded-full font-bold font-serif">
                     {fac.status || "Active"}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-2">Admin ID: {fac.adminId}</p>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-6">
            <HiCheckCircle className="w-6 h-6 mx-auto mb-2 text-green-500" />
            No approved faculty members found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovedFacality;
