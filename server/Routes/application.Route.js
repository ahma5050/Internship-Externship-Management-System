import express from "express";
import upload from "../middlewares/upload.js";
import {
  createApplication,
  getPendingApplications,
  approveApplication,
  rejectApplication,  // Import rejectApplication controller
  getApprovedApplications,
  getFacultyStats,
  getrejectedApplications,
  getApplicationsByStatus,
  gettouserPendingApplications,
  getApprovedtouserUserApplications,
  
} from "../Controllers/applicationController.js";

const router = express.Router();

// 🔽 Create new internship application with file upload
router.post(
  "/createApplication",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
    { name: "portfolio", maxCount: 1 },
  ]),
  createApplication
);

// 🔽 Get all applications (with optional query filters like status, facultyId, etc.)
router.get("/", getPendingApplications);

// 🔽 Faculty approves an application
router.put("/:id/approve", approveApplication);

// 🔽 Faculty rejects an application (new route for rejection)
router.put("/:id/reject", rejectApplication);  // This is the new route for rejecting applications

// 🔽 Fetch applications of all statuses (for analytics or summary view)
router.get("/facultyStats", getFacultyStats);

// 🔽 Fetch only applications that are approved
router.get("/approved", getApprovedApplications);
router.get("/rejected", getrejectedApplications);
router.get("/", getApplicationsByStatus);
router.get("/ApplicantPendingfrouser", gettouserPendingApplications);
router.get("/ApplicantApprovedforuser", getApprovedtouserUserApplications);

export default router;
