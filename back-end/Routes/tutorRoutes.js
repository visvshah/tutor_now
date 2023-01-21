import express from "express";
const router = express.Router()
import { registerTutor, loginTutor} from '../Controllers/tutorController.js'

router.post('/signup', registerTutor);
router.post('/login', loginTutor);

export default router;