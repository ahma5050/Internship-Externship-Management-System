import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { MdCheckCircle, MdCancel, MdAccessTime, MdBusiness, MdPerson, MdToday, MdLogin, MdLogout, MdNotes } from "react-icons/md";
import { useSelector } from "react-redux";

const AttendanceApproval = ({ facultyId }) => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  console.log("attendancesattendancesattendances", attendances);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        setLoading(true);
        const facultyId = localStorage.getItem("facultyId");
        const res = await fetch(`/api/attendanceRoute/pending/${facultyId}`);
        const data = await res.json();
        setAttendances(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching attendances:", err);
        setAttendances([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendances();
  }, [facultyId]);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`/api/attendanceRoute/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setAttendances((prev) => prev.filter((a) => a._id !== id));
      } else {
        console.error("Failed to update status:", await res.text());
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <MdAccessTime className="mr-2 text-blue-600" />
        Pending Attendance Approvals
      </h2>

      {attendances.length === 0 ? (
        <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-8 text-center">
          <MdCheckCircle className="mx-auto text-4xl text-blue-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
            No pending attendance records
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            All attendance requests have been processed
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {attendances.map((att) => (
            <div
              key={att._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  
                           <div className="flex items-center justify-center h-full w-full bg-gray-400 text-white text-xl font-bold rounded-full border-2 border-cyan-300">
                             <span className=' text-pink-700 font-serif text-2xl'>{att?.studentName?.[0]}</span>
                           </div>
                        
                     
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                      {att.studentName}
                    </h3>
                    <div className="mt-1 space-y-1">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MdBusiness className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500" />
                        <span>{att.companyName}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MdToday className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500" />
                        <span>{att.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <MdLogin className="mr-1.5 h-4 w-4 text-green-500" />
                      <span>Check-in</span>
                    </div>
                    <div className="mt-1 font-medium text-gray-900 dark:text-white">
                      {att.checkIn}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <MdLogout className="mr-1.5 h-4 w-4 text-red-500" />
                      <span>Check-out</span>
                    </div>
                    <div className="mt-1 font-medium text-gray-900 dark:text-white">
                      {att.checkOut}
                    </div>
                  </div>
                </div>

                {att.notes && (
                  <div className="mt-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <MdNotes className="mr-1.5 h-4 w-4 text-gray-500" />
                      <span>Notes</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                      {att.notes}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleStatusChange(att._id, "approved")}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    <MdCheckCircle className="mr-2 h-5 w-5" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(att._id, "rejected")}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    <MdCancel className="mr-2 h-5 w-5" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceApproval;