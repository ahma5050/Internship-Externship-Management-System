import Application from "../Models/Application.js";
import UserModel from "../Models/UserModel.js";
import mongoose from "mongoose";
export const createApplication = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      university,
      degree,
      major,
      graduationYear,
      position,
      startDate,
      endDate,
      duration,
      about,
      facultyId, 
      applicantId,    
      postId     
    } = req.body;

    console.log("Received IDs ->", { facultyId, applicantId, postId });

    const resume = req.files?.resume?.[0]?.filename || null;
    const coverLetter = req.files?.coverLetter?.[0]?.filename || null;
    const portfolio = req.files?.portfolio?.[0]?.filename || null;

    if (!facultyId || !applicantId || !postId) {
      return res.status(400).json({
        message: "Missing one or more required IDs: facultyId, applicantId, or postId.",
      });
    }

    const application = new Application({
      firstName,
      lastName,
      email,
      phone,
      university,
      degree,
      major,
      graduationYear,
      resume,
      coverLetter,
      portfolio,
      position,
      startDate,
      endDate,
      duration,
      about,
      facultyId,
      applicantId, 
      postId,
      status: "pending"
    });

    const savedApplication = await application.save();

    // ✅ Update user's applicationStatus after application is saved
    await UserModel.findByIdAndUpdate(applicantId, { applicationStatus: "pending" });

    res.status(201).json(savedApplication);

  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ message: "Server error while submitting application." });
  }
};



export const getPendingApplications = async (req, res) => {
  try {
    const { status, facultyId } = req.query;
   
    const query = {};
    if (status) query.status = status;

    let applications = await Application.find(query)
      .populate({
        path: "postId",   // Populating the postId with post details
        select: "facultyId",  // Only pulling the facultyId from the post
      })
      .sort({ createdAt: -1 });

 
   

    if (facultyId) {
      applications = applications.filter(
        (app) => app.postId?.facultyId?.toString() === facultyId
      );
    }
    

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch applications",
      error: err.message,
    });
  }
};



export const approveApplication = async (req, res) => {
  try {
    const { id } = req.params; // Application ID
    const { facultyId } = req.body; // ID of the faculty attempting approval
    console.log("Faculty ID attempting approval:", facultyId);

    // Fetch the application and populate the post to get the post's facultyId
    const application = await Application.findById(id).populate({
      path: "postId",
      select: "facultyId",
    });

    // Check if the application exists
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    // Ensure the post exists and has a facultyId
    if (!application.postId || !application.postId.facultyId) {
      return res.status(400).json({ message: "Associated post or faculty not found." });
    }

    // Check if the requesting faculty is authorized to approve
    if (application.postId.facultyId.toString() !== facultyId) {
      return res.status(403).json({ message: "Unauthorized: You can only approve applications for your own posts." });
    }

    // Update application approval status
    application.facultyApproved = true;
    application.status = "approved";
    await application.save();

    // ✨ Now update user's applicationStatus to "approved"
    const user = await UserModel.findById(application.applicantId);
    if (user) {
      user.applicationStatus = "approved"; 
      await user.save();
    }

    res.status(200).json({ 
      message: "Application approved successfully.", 
      application,
      updatedUser: user 
    });

  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ message: "Failed to approve application.", error: error.message });
  }
};

export const rejectApplication = async (req, res) => {
  try {
    const { id } = req.params; // Application ID
    const { facultyId } = req.body; // Faculty ID who is rejecting the application

    // Fetch the application and populate the post to get the post's facultyId
    const application = await Application.findById(id).populate({
      path: "postId",
      select: "facultyId",
    });

    // Check if the application exists
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    // Ensure the post exists and has a facultyId
    if (!application.postId || !application.postId.facultyId) {
      return res.status(400).json({ message: "Associated post or faculty not found." });
    }

    // Check if the requesting faculty is authorized to reject
    if (application.postId.facultyId.toString() !== facultyId) {
      return res.status(403).json({ message: "Unauthorized: You can only reject applications for your own posts." });
    }

    // Update rejection status
    application.facultyApproved = false;
    application.status = "rejected";  // Set the status to rejected

    await application.save();

    res.status(200).json(application);  // Return the updated application
    console.log("Rejected application:", application);

  } catch (error) {
    console.error("Rejection error:", error);
    res.status(500).json({ message: "Failed to reject application.", error: error.message });
  }
};

 /*export const rejectApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Application.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Application not found." });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to reject application." });
  }
};*/

/*export const acceptApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);
    if (!application) return res.status(404).json({ message: "Application not found." });

    if (!application.facultyApproved) {
      return res.status(400).json({ message: "Faculty approval required before acceptance." });
    }

    application.status = "accepted";
    await application.save();

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Failed to accept application." });
  }
};*/


// Example controller for fetching stats (approved and rejected)
export const getFacultyStats = async (req, res) => {
  try {
    const { facultyId } = req.query;

    // Get count of approved applications
    const approvedCount = await Application.countDocuments({
      facultyId,
      status: 'approved',
    });

    // Get count of rejected applications
    const rejectedCount = await Application.countDocuments({
      facultyId,
      status: 'rejected',
    });

    res.status(200).json({ approved: approvedCount, rejected: rejectedCount });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Error fetching stats." });
  }
};


/*
export const allStatusApplication = async (req, res) => {
  try {
    const approved = await Application.countDocuments({ status: "approved" });
    const rejected = await Application.countDocuments({ status: "rejected" });
    res.json({ approved, rejected });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
*/
export const getApprovedApplications = async (req, res) => {
  try {
    const { facultyId } = req.query;

    if (!facultyId) {
      return res.status(400).json({ message: "Faculty ID is required" });
    }

    const approvedApplications = await Application.find({
      facultyApproved: true,
      facultyId: facultyId, // directly from Application
    });

    res.status(200).json(approvedApplications);
  } catch (err) {
    console.error("Error fetching approved applications:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getrejectedApplications=async (req, res) => {
  try {
    const { facultyId } = req.query;

    if (!facultyId) {
      return res.status(400).json({ message: 'Faculty ID is required' });
    }

    const rejectedApplications = await Application.find({
      status: 'rejected',
      facultyId: facultyId,
    });

    res.status(200).json(rejectedApplications);
  } catch (error) {
    console.error('Error fetching rejected applications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getApplicationsByStatus = async (req, res) => {
  try {
    const { status, facultyId, applicantId } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (facultyId && mongoose.Types.ObjectId.isValid(facultyId)) {
      filter.facultyId = new mongoose.Types.ObjectId(facultyId);
    }
    if (applicantId && mongoose.Types.ObjectId.isValid(applicantId)) {
      filter.applicantId = new mongoose.Types.ObjectId(applicantId);
    }

    const applications = await Application.find(filter).lean();
    res.status(200).json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//for user dashboard

export const gettouserPendingApplications = async (req, res) => {
  try {
    const { status, applicantId } = req.query;

    if (!applicantId || !mongoose.Types.ObjectId.isValid(applicantId)) {
      return res.status(400).json({ message: "Invalid applicantId" });
    }

    const query = {
      applicantId: new mongoose.Types.ObjectId(applicantId),
    };
    if (status) {
      query.status = status;
    }

    const applications = await Application.find(query)
      .populate({
        path: "postId",
        select: "title", // only fetching post title for user UI
      })
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    console.error("Error fetching user applications:", err);
    res.status(500).json({
      message: "Failed to fetch user applications",
      error: err.message,
    });
  }
};

// GET /api/applicationRoute/user-applications?applicantId=...
export const getApprovedtouserUserApplications = async (req, res) => {
  try {
    const { applicantId } = req.query;

    if (!applicantId) {
      return res.status(400).json({ message: "Missing applicantId" });
    }

    const applications = await Application.find({
      applicantId,
      status: "approved", // ✅ Only fetch approved applications
    })
      .populate("postId") // include post details
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching approved user applications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

