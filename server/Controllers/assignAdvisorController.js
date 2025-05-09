import AdvisorAssignment from '../Models/AdvisorAssignment.js';
import UserModel from "../Models/UserModel.js";
import Application from '../Models/Application.js';

export const assignAdvisor = async (req, res) => {
  const { advisorId, userId, AdminId, startDate, endDate } = req.body;
  console.log("advisorId:", advisorId);
  console.log("userId:", userId);   
  console.log("AdminId:", AdminId);   

  if (!advisorId || !userId || !AdminId || !startDate || !endDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const advisor = await UserModel.findById(advisorId);
    if (!advisor) return res.status(404).json({ message: 'Advisor not found' });

    const application = await Application.findOne({ applicantId: userId, status: 'approved', assign: false }); 
    if (!application) return res.status(404).json({ message: 'Approved application not found for this student' });

    const assignment = new AdvisorAssignment({
      AdvisorId: advisor._id,
      advisorName: advisor.userName,
      advisorEmail: advisor.email,
      advisorstatus: advisor.status,
      studentId: userId,
      studentName: application.firstName + ' ' + application.lastName,
      studentEmail: application.email,
      companyName: application.university,
      studentStatus: application.status,
      assignedBy: AdminId,
      assign: true,
      startDate,
      endDate,
    });
    

    await assignment.save();
    await Application.updateOne({ applicantId: userId, status: 'approved', assign: false }, { assign: true });  

    res.status(201).json({ message: 'Advisor assigned successfully', assignment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getAllAdvisorAssignments = async (req, res) => {
  try {
    const assignments = await AdvisorAssignment.find().sort({ createdAt: -1 });
    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Failed to fetch advisor assignments' });
  }
};

// DELETE an assignment
export const deleteAssignment = async (req, res) => {
  try {
    const { studentId } = req.body;

    const deleted = await AdvisorAssignment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Assignment not found' });

    if (studentId) {
      await Application.updateMany({ applicantId: studentId }, { assign: false });
    }

    res.status(200).json({ message: 'Assignment and related application updated' });
  } catch (err) {
    console.log('Delete Error:', err);
    res.status(500).json({ message: 'Failed to delete assignment' });
  }
};
// UPDATE an assignment
export const updateAssignment = async (req, res) => {
  try {
    const { studentEmail, advisorEmail, startDate, endDate } = req.body;
    console.log("Update data:", { studentEmail, advisorEmail, startDate, endDate });
    
    // First get the current assignment
    const currentAssignment = await AdvisorAssignment.findById(req.params.id);
    if (!currentAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    // Only proceed with lookups if emails actually changed
    if (advisorEmail && advisorEmail !== currentAssignment.advisorEmail) {
      const advisor = await UserModel.findOne({ 
        email: advisorEmail, 
        roles: 'Advisor', 
        status: 'approved' 
      });
      console.log("Found advisor:", advisor);
      if (!advisor) {
        return res.status(404).json({ message: 'New advisor not found or not approved' });
      }
      // Update advisor-related fields
      currentAssignment.AdvisorId = advisor._id;
      currentAssignment.advisorName = advisor.userName;
      currentAssignment.advisorEmail = advisor.email;
      currentAssignment.advisorstatus = advisor.status;
    }
    
    if (studentEmail && studentEmail !== currentAssignment.studentEmail) {
      const application = await Application.findOne({ 
        email: studentEmail, 
        status: 'approved' 
      });
      if (!application) {
        return res.status(404).json({ message: 'Approved application for new student not found' });
      }
      // Update student-related fields
      currentAssignment.studentId = application.applicantId;
      currentAssignment.studentName = application.name;
      currentAssignment.studentEmail = application.email;
      currentAssignment.studentStatus = application.status;
    }

    // Update dates if provided
    if (startDate) {
      currentAssignment.startDate = new Date(startDate);
    }
    if (endDate) {
      currentAssignment.endDate = new Date(endDate);
    }
    
    const updated = await currentAssignment.save();
    
    res.status(200).json(updated);
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ 
      message: 'Failed to update assignment',
      error: err.message
    });
  }
};


// Get user counts
export const getapprovedUAF=async (req, res) => {
  try {
    const facultyCount = await UserModel.countDocuments({ 
      roles: 'Faculty',
      status: 'approved' 
    });
    const advisorCount = await UserModel.countDocuments({ 
      roles: 'Advisor',
      status: 'approved' 
    });
    const studentCount = await UserModel.countDocuments({ 
      roles: 'User',
      userStatus: 'approved'  
    });

    res.status(200).json({
      facultyCount,
      advisorCount,
      studentCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};