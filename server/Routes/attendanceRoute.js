import express from 'express';
import { ApprovedAtendance, approvrejecStates, createAttendance, getPendingAttendancesByFaculty, RejectedAttendance, updateAttendanceStatus, UserapprovedAtte, UserpendingAtte } from '../Controllers/attendanceController.js';
const router = express.Router();

router.post('/submit', createAttendance);
// ✅ New Route: Get pending attendances for faculty
router.get('/pending/:facultyId', getPendingAttendancesByFaculty);
router.put('/status/:id', updateAttendanceStatus);
router.get('/attendanceStats', approvrejecStates);
router.get('/approved/:facultyId', ApprovedAtendance)
// routes/attendanceRoutes.js
router.get('/rejected/:facultyId', RejectedAttendance);
router.get('/pending', UserpendingAtte)
router.get('/approved', UserapprovedAtte)


export default router;
