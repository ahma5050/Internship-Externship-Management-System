import express from 'express';
import { evaluatedbyfaculty, Facultyevaluation } from '../Controllers/evaluation.js';
const router = express.Router();
router.post("/submit", Facultyevaluation);
router.get('/evaluations/:facultyId', evaluatedbyfaculty);



export default router;