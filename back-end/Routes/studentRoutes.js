import express from "express";
const router = express.Router()
import { registerUser, loginUser} from '../Controllers/studentController.js'

router.post('/signup', registerUser);
router.post('/login', loginUser);

export default router;