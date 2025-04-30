import Attendance from '../Models/attendanceModel.js';
import Application from "../Models/Application.js";

export const createAttendance = async (req, res) => {
  try {
    const {
      applicantId,
      studentName,
      companyName,
      date,
      checkIn,
      checkOut,
      notes,
    } = req.body;

    // Validate required fields
    if (!applicantId || !studentName || !companyName || !date || !checkIn || !checkOut) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log("Received date:", date);

    // Ensure the date is in the correct format (ISO string 'YYYY-MM-DD')
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Find the approved application
    const application = await Application.findOne({
      applicantId,
      status: 'approved',
    });

    if (!application) {
      return res.status(404).json({
        message: 'Approved application not found for this applicant',
      });
    }

    // Create attendance record with info from application
    const attendance = new Attendance({
      applicantId,
      studentName,
      companyName,
      date: parsedDate.toISOString().split('T')[0], // Ensure date is in 'YYYY-MM-DD' format
      checkIn,
      checkOut,
      notes,
      postId: application.postId,
      facultyId: application.facultyId,
      status: 'pending', // Initially pending approval
    });

    await attendance.save();

    res.status(201).json({
      message: 'Attendance submitted successfully and is pending approval',
      attendance,
    });
  } catch (error) {
    console.error('Error submitting attendance:', error);
    res.status(500).json({ message: 'Server error submitting attendance' });
  }
};

// ✅ Get pending attendances for a specific faculty
export const getPendingAttendancesByFaculty = async (req, res) => {
      try {
        const { facultyId } = req.params;
        const attendances = await Attendance.find({ facultyId, status: 'pending' });
        res.status(200).json(attendances);
      } catch (err) {
        res.status(500).json({ message: 'Error fetching attendance', error: err.message });
      }
    };
    
   // controllers/attendanceController.js

export const updateAttendanceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Attendance.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Attendance not found' });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const approvrejecStates=async (req, res) => {
  const { facultyId } = req.query;

  try {
    const approvedCount = await Attendance.countDocuments({ facultyId, status: 'approved' });
    const rejectedCount = await Attendance.countDocuments({ facultyId, status: 'rejected' });

    res.json({ approvedAttendance: approvedCount, rejectedAttendance: rejectedCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attendance stats', error: err });
  }
};

// GET approved attendance by facultyId
export const ApprovedAtendance = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const attendances = await Attendance.find({ facultyId, status: 'approved' });
    res.status(200).json(attendances);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching approved attendances.' });
  }
};

export const RejectedAttendance = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const attendances = await Attendance.find({ facultyId, status: 'rejected' });
    res.status(200).json(attendances);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching rejected attendances.' });
  }
};


// Example: GET pending with applicantId
export const UserpendingAtte = async (req, res) => {
  const { applicantId } = req.query;
  try {
    const records = await Attendance.find({
      applicantId,
      status: 'pending'
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pending attendance." });
  }
};

// Same for /approved
export const UserapprovedAtte = async (req, res) => {
  const { applicantId } = req.query;
  try {
    const records = await Attendance.find({
      applicantId,
      status: 'approved'
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching approved attendance." });
  }
};



