import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  // Personal Information
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String, required: true },

  // Education
  university:     { type: String, required: true },
  degree:         { type: String, required: true },
  major:          { type: String, required: true },
  graduationYear: { type: Number, required: true },

  // Document filenames or file paths
  resume:      { type: String, required: true },
  coverLetter: { type: String, required: false }, // optional
  portfolio:   { type: String, required: false }, // optional

  // Application details
  position:   { type: String, required: true },
  startDate:  { type: Date, required: true },
  endDate:    { type: Date, required: true },
  duration:   { type: String, required: true },
  about:      { type: String, required: true },

  // Workflow status
  facultyApproved: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "approved", "accepted", "rejected"],
    default: "pending",
  },

  // Faculty reference (assuming faculty users are stored in the User model)
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },

  // Timestamp
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Application", applicationSchema);
