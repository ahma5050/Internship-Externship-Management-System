import express from 'express';
import { assignAdvisor, deleteAssignment, getAllAdvisorAssignments, getapprovedUAF, updateAssignment } from '../Controllers/assignAdvisorController.js';


const router = express.Router();
router.post("/assign", assignAdvisor);
router.get('/allassignment', getAllAdvisorAssignments);
router.delete('/delete/:id', deleteAssignment);         // For deleting assignment
router.put('/update/:id', updateAssignment);     
router.get('/user-counts', getapprovedUAF)


export default router;