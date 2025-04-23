import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  Label,
  Select,
  TextInput,
  Textarea,
  FileInput,
} from "flowbite-react";
import { ThemContext } from "../context/ThemContext";
import { useSelector } from "react-redux";

const ApplayInter = () => {
  const { darkMode } = useContext(ThemContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const facultyId = searchParams.get("facultyId");
const postId = searchParams.get("postId");

console.log("facultyId:", facultyId);
console.log("postId:", postId);
localStorage.setItem("facultyId", facultyId);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      
      
      const res = await fetch("/api/applicationRoute/createApplication", {
        method: "POST",
        body: formData,
      });


      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Submission failed");

      alert("Application Submitted Successfully!");
      form.reset();
    } catch (error) {
      alert("Submission error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link
            to="/"
            className={`text-sm font-medium ${
              darkMode
                ? "text-indigo-300 hover:text-indigo-500"
                : "text-indigo-600 hover:text-indigo-800"
            }`}
          >
            ← Back to Home
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">
            Internship Application
          </h1>
          <p className="mt-2 text-lg">
            Complete the form below to apply for our internship program
          </p>
        </div>

        <Card className="shadow-lg p-6 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
          <input type="hidden" name="facultyId" value={facultyId} />
<input type="hidden" name="applicantId" value={currentUser?._id} />
<input type="hidden" name="postId" value={postId} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <TextInput id="firstName" name="firstName" placeholder="John" required />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <TextInput id="lastName" name="lastName" placeholder="Doe" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <TextInput id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <TextInput id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" required />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Education</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="university">University</Label>
                  <TextInput id="university" name="university" placeholder="Your University" required />
                </div>
                <div>
                  <Label htmlFor="degree">Degree</Label>
                  <Select id="degree" name="degree" required>
                    <option value="">Select degree</option>
                    <option value="bachelor">Bachelor's</option>
                    <option value="master">Master's</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="major">Field of Study</Label>
                  <TextInput id="major" name="major" placeholder="Computer Science" required />
                </div>
                <div>
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <TextInput id="graduationYear" name="graduationYear" type="number" min="2023" max="2030" placeholder="2025" required />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Documents</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="resume">Resume/CV</Label>
                  <FileInput id="resume" name="resume" required />
                </div>
                <div>
                  <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                  <FileInput id="coverLetter" name="coverLetter" />
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio (Optional)</Label>
                  <FileInput id="portfolio" name="portfolio" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <div className="grid gap-6">
                <div>
                  <Label htmlFor="position">Position Applying For</Label>
                  <Select id="position" name="position" required>
                    <option value="">Select position</option>
                    <option value="software">Software Development</option>
                    <option value="design">UI/UX Design</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="data">Data Analysis</option>
                    <option value="content">Content Creation</option>
                  </Select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <TextInput id="startDate" name="startDate" type="date" required />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <TextInput id="endDate" name="endDate" type="date" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="duration">Preferred Duration</Label>
                  <Select id="duration" name="duration" required>
                    <option value="">Select duration</option>
                    <option value="3months">3 months</option>
                    <option value="6months">6 months</option>
                    <option value="summer">Summer</option>
                    <option value="flexible">Flexible</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="about">Why do you want to join?</Label>
                  <Textarea id="about" name="about" placeholder="Write your motivation..." rows={4} required />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button type="submit" color="indigo" isProcessing={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Card>

        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>
            By submitting this application, you consent to our processing of your personal information for recruitment purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplayInter;
