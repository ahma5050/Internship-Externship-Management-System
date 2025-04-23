import { useEffect, useState } from "react";
import { Card } from "flowbite-react";

const AttendanceApproval = ({ facultyId }) => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const facultyId = localStorage.getItem("facultyId");
        const res = await fetch(`/api/attendanceRoute/pending/${facultyId}`);
        const data = await res.json();
        setAttendances(Array.isArray(data) ? data : []); // ensure it's always an array
      } catch (err) {
        console.error("Error fetching attendances:", err);
        setAttendances([]); // fallback
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
      console.log("resddd", res)

      if (res.ok) {
        setAttendances((prev) => prev.filter((a) => a._id !== id));
      } else {
        console.error("Failed to update status:", await res.text());
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2">
      {attendances.length === 0 ? (
        <p className="text-center col-span-2 text-gray-500">
          No pending attendance records.
        </p>
      ) : (
        attendances.map((att) => (
          <Card key={att._id}>
            <h5 className="text-lg font-semibold">{att.studentName}</h5>
            <p>Company: {att.companyName}</p>
            <p>Date: {att.date}</p>
            <p>Check-in: {att.checkIn}</p>
            <p>Check-out: {att.checkOut}</p>
            <p>Notes: {att.notes}</p>
            <div className="mt-2 flex gap-2">
              <button
                className="px-3 py-1 bg-green-500 text-white rounded"
                onClick={() => handleStatusChange(att._id, "approved")}
              >
                Approve
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => handleStatusChange(att._id, "rejected")}
              >
                Reject
              </button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default AttendanceApproval;
