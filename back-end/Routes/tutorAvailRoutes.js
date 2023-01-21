import express from "express";
const router = express.Router()
import { createTutorAvail, fetchTutors, requestTutor, createSession, createReview, deleteAvailTutor} from '../Controllers/tutorAvailController.js'

router.post('/create', createTutorAvail);
router.patch('/fetch', fetchTutors);
router.patch('/request', requestTutor);
router.delete('/:id', deleteAvailTutor)



export default router;