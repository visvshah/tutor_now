import express from "express";
const router = express.Router()
import { registerStudent, loginStudent, getStudents, getStudent} from '../Controllers/studentController.js'

router.post('/signup', registerStudent);
router.post('/login', loginStudent);
router.get('/', getStudents);
router.get('/:id', getStudent);



export default router;