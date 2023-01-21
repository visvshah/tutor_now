import express from "express";
const router = express.Router()
import { registerTutor, loginTutor, getTutor, getTutors} from '../Controllers/tutorController.js'

router.post('/signup', registerTutor);
router.post('/login', loginTutor);
router.get('/', getTutors);
router.get('/:id', getTutor);

export default router;