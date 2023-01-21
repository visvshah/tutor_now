import express from "express";
const router = express.Router()
//import everything from requestModel.js
import { createRequest, fetchRequests, fetchRequest, updateRequest, deleteRequest} from '../Controllers/requestController.js'


router.post('/createrequest', createRequest);
router.post('/fetchrequests', fetchRequests);




export default router;