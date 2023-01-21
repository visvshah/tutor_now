import express from "express";
const router = express.Router()
import { registerStudent, loginStudent} from '../Controllers/studentController.js'

router.post('/signup', registerStudent);
router.post('/login', loginStudent);



export default router;