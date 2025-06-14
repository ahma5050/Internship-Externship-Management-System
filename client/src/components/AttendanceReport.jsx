import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Card,
  Spinner,
  Toast,
} from "flowbite-react";
import { HiCheckCircle, HiExclamation } from "react-icons/hi";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
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
        setToastMessage("Attendance submitted successfully!");
        setIsSuccess(true);
        setFormData({
          studentName: "",
          companyName: "",
          date: "",
          checkIn: "",
          checkOut: "",
          notes: "",
        });
      } else {
        setToastMessage("Submission failed: " + data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setToastMessage("An error occurred while submitting attendance.");
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-16 px-4 flex justify-center items-center"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="w-full max-w-4xl"
      >
        <Card className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl border border-indigo-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="text-center mb-10">
            <motion.h2
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-sans tracking-tight"
            >
              Internship Attendance Form
            </motion.h2>
            <p className="mt-2 text-gray-500">Track your professional journey</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Name */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="space-y-2"
            >
              <Label htmlFor="studentName" value="Student Name" className="text-gray-700 font-medium" />
              <TextInput
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                addon="👤"
              />
            </motion.div>

            {/* Company Name */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="space-y-2"
            >
              <Label htmlFor="companyName" value="Internship Company" className="text-gray-700 font-medium" />
              <TextInput
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company name"
                required
                className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                addon="🏢"
              />
            </motion.div>

            {/* Date */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="space-y-2"
            >
              <Label htmlFor="date" value="Date" className="text-gray-700 font-medium" />
              <TextInput
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                addon="📅"
              />
            </motion.div>

            {/* Time Fields */}
            <div className="space-y-4">
              <Label value="Working Hours" className="text-gray-700 font-medium" />
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="flex-1 space-y-2"
                >
                  <Label htmlFor="checkIn" value="Check-In" className="text-sm text-gray-600" />
                  <TextInput
                    id="checkIn"
                    name="checkIn"
                    type="time"
                    value={formData.checkIn}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    addon="⏰"
                  />
                </motion.div>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="flex-1 space-y-2"
                >
                  <Label htmlFor="checkOut" value="Check-Out" className="text-sm text-gray-600" />
                  <TextInput
                    id="checkOut"
                    name="checkOut"
                    type="time"
                    value={formData.checkOut}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    addon="🚪"
                  />
                </motion.div>
              </div>
            </div>

            {/* Notes */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="md:col-span-2 space-y-2"
            >
              <Label htmlFor="notes" value="Additional Notes" className="text-gray-700 font-medium" />
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Share your daily learnings or challenges..."
                className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="md:col-span-2 flex justify-center pt-4"
            >
              <Button
                type="submit"
                gradientDuoTone="purpleToBlue"
                size="lg"
                disabled={isSubmitting}
                className="w-full md:w-1/2 py-2 font-bold transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Processing...
                  </>
                ) : (
                  "Submit Attendance"
                )}
              </Button>
            </motion.div>
          </form>
        </Card>
      </motion.div>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Toast>
            <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isSuccess ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
              {isSuccess ? <HiCheckCircle className="h-5 w-5" /> : <HiExclamation className="h-5 w-5" />}
            </div>
            <div className="ml-3 text-sm font-normal">
              {toastMessage}
            </div>
            <Toast.Toggle onDismiss={() => setShowToast(false)} />
          </Toast>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AttendanceReport;