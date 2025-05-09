import express from 'express';
import Evaluation from '../Models/Evaluation.js';
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
    
        // Check for existing evaluation for this student/week
        const existingEval = await Evaluation.findOne({
          facultyId,
          studentId,
          weekStartDate: new Date(weekStartDate)
        });
    
        if (existingEval) {
          return res.status(400).json({
            message: 'Evaluation already exists for this student/week',
            evaluationId: existingEval._id
          });
        }
    
       // In your submit route handler:
const evaluation = new Evaluation({
      facultyId,
      studentId,
      weekStartDate: new Date(weekStartDate),
      weekEndDate: new Date(weekEndDate),
      weeklyPerformance,
      projectEvaluation: {
        ...projectEvaluation,
        deadline: projectEvaluation.deadline ? new Date(projectEvaluation.deadline) : null
      },
      overallGrade
    });
    
    // Add this validation before saving
if (isNaN(new Date(weekStartDate).getTime()) || isNaN(new Date(weekEndDate).getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
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
    }

    // Example Express GET route
export const evaluatedbyfaculty = async (req, res) => {
      try {
        const evaluations = await Evaluation.find({ facultyId: req.params.facultyId });
        res.json(evaluations);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch evaluations' });
      }
    };
    
 
   