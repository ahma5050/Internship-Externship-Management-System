import express from 'express';
import { evaluatedbyfaculty, Facultyevaluation, getStudentProgress } from '../Controllers/evaluation.js';
const router = express.Router();
router.post("/submit", Facultyevaluation);
router.get('/evaluations/:facultyId', evaluatedbyfaculty);
router.get('/progress/:studentId', getStudentProgress);




export default router;