import React, { useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Card,
} from "flowbite-react";
import { useSelector } from "react-redux";

const AttendanceReport = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    studentName: "",
    companyName: "",
    date: "",
    checkIn: "",
    checkOut: "",
    notes: "",
  });

  console.log("formData", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data before submission:", formData); // Log formData to check date
    try {
      const payload = {
        ...formData,
        applicantId: currentUser._id,
      };

      const res = await fetch("/api/attendanceRoute/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data.message);
        alert("Attendance submitted successfully!");
        setFormData({
          studentName: "",
          companyName: "",
          date: "",
          checkIn: "",
          checkOut: "",
          notes: "",
        });
      } else {
        alert("Submission failed: " + data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting attendance.");
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 flex justify-center items-center">
      <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-md shadow-2xl rounded-lg border border-yellow-300">
        <h2 className="lg:text-4xl text-xl md:text-5xl font-extrabold text-center mb-10 font-serif tracking-wide drop-shadow-sm">
          📝 Internship Attendance Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div>
            <Label htmlFor="studentName" value="Student Name" />
            <TextInput
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              shadow
            />
          </div>

          <div>
            <Label htmlFor="companyName" value="Internship Company" />
            <TextInput
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              required
              shadow
            />
          </div>

          <div>
            <Label htmlFor="startDate" value="Start Date" />
            <TextInput
              id="startDate"
              name="date" // Set the name to match the formData key
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              shadow
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <div className="w-full">
              <Label htmlFor="checkIn" value="Check-In Time" />
              <TextInput
                id="checkIn"
                name="checkIn"
                type="time"
                value={formData.checkIn}
                onChange={handleChange}
                required
                shadow
              />
            </div>
            <div className="w-full">
              <Label htmlFor="checkOut" value="Check-Out Time" />
              <TextInput
                id="checkOut"
                name="checkOut"
                type="time"
                value={formData.checkOut}
                onChange={handleChange}
                required
                shadow
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="notes" value="Additional Notes" />
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Optional comments or updates"
              shadow
            />
          </div>

          <div className="md:col-span-2 flex justify-center pt-6">
            <Button type="submit">Submit Attendance</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AttendanceReport;
