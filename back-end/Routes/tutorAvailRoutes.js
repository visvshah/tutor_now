import express from "express";
const router = express.Router()
import { createTutorAvail, fetchTutors, requestTutor, createSession, createReview, deleteAvailTutor, getAllTutors} from '../Controllers/tutorAvailController.js'

router.post('/create', createTutorAvail);
router.patch('/fetch', fetchTutors);
router.patch('/request', requestTutor);
router.delete('/:id', deleteAvailTutor)
router.get('/', getAllTutors)



export default router;

//http://localhost:5001/api/tutorsavails/create