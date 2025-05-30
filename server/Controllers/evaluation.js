import express from 'express';
import Evaluation from '../Models/Evaluation.js';
import Application from "../Models/Application.js";
import Attendance from '../Models/attendanceModel.js';

export const Facultyevaluation = async (req, res) => {
  try {
    const {
      facultyId,
      studentId,
      weekStartDate,
      weekEndDate,
      weeklyPerformance,
      projectEvaluation,
      overallGrade
    } = req.body;
    console.log("studentId", studentId);  

    // Validate date format
    const weekStart = new Date(weekStartDate);
    const weekEnd = new Date(weekEndDate);
    if (isNaN(weekStart.getTime()) || isNaN(weekEnd.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    // Check for existing evaluation
    const existingEval = await Evaluation.findOne({
      facultyId,
      studentId,
      weekStartDate: weekStart
    });

    // Fetch student data from Application
    const student = await Application.findOne({ applicantId: studentId });

    if (!student) {
      return res.status(404).json({ error: 'Student application not found' });
    }

    const internshipStart = new Date(student.startDate);
    const internshipEnd = new Date(student.endDate);
    const deadline = projectEvaluation.deadline ? new Date(projectEvaluation.deadline) : null;

    // Validate weekly dates are within internship period
    if (weekStart < internshipStart || weekEnd > internshipEnd) {
      return res.status(400).json({
        error: 'Weekly evaluation dates must be within the internship period'
      });
    }

    // Validate project deadline is within internship period
    if (deadline && (deadline < internshipStart || deadline > internshipEnd)) {
      return res.status(400).json({
        error: 'Project deadline must be within the internship period'
      });
    }

    const evaluation = new Evaluation({
      facultyId,
      studentId,
      active: `${student.assign}`,
      studentName: `${student.firstName} ${student.lastName}`,
      studentEmail: student.email,
      weekStartDate: weekStart,
      weekEndDate: weekEnd,
      startDate: internshipStart,
      endDate: internshipEnd,
      weeklyPerformance,
      projectEvaluation: {
        ...projectEvaluation,
        deadline: deadline
      },
      overallGrade
    });

    await evaluation.save();
    res.status(201).json({
      message: 'Weekly evaluation submitted successfully',
      evaluationId: evaluation._id
    });

  } catch (error) {
    console.error('Error submitting evaluation:', error);
    res.status(500).json({
      error: error.message || 'Failed to submit evaluation',
      details: error.errors
    });
  }
};

    // Example Express GET route
export const evaluatedbyfaculty = async (req, res) => {
      try {
        const evaluations = await Evaluation.find({ facultyId: req.params.facultyId });
        res.json(evaluations);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch evaluations' });
      }
    };

    
    export const getStudentProgress = async (req, res) => {
      try {
        const { studentId } = req.params;
    
        const evaluations = await Evaluation.find({ studentId }).sort({ weekStartDate: 1 });
        const attendance = await Attendance.find({ applicantId: studentId, status: 'approved' }).sort({ date: 1 });
        const application = await Application.findOne({ applicantId: studentId });
    
        if (!application) {
          return res.status(404).json({ error: 'Student not found' });
        }
    
        res.json({
          evaluations,
          attendance,
          studentInfo: {
            name: `${application.firstName} ${application.lastName}`,
            email: application.email,
            startDate: application.startDate,
            endDate: application.endDate
          }
        });
    
      } catch (error) {
        console.error('Error fetching student progress:', error);
        res.status(500).json({ error: 'Failed to fetch student progress data' });
      }
    };