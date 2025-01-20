import express from "express";
import { addDoctor, allDoctors, loginAdmin, appointmentsAdmin, appointmentCancel, adminDashBoard } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/doctorController.js";

// route instance
const adminRouter = express.Router()

// by using express.router we can create a multiple end points
// the end point like below

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)

// 1- adminRouter.post('/add-doctor', 
// defined post method for route 'add-doctor' endpoint on the [adminRouter]
// 2- upload.single('image'), 
// - using multer 'upload' midlleware to handle file uploads
// - the upload.single('image'), middleware indicates that we expect a single file upload
// with the field name 'image'.
// 3- 'addDoctor' function is the route handler that will be called after the file upload
// is processed. This function will handle the logic for adding a new doctor to the system.

adminRouter.post('/login', loginAdmin)

adminRouter.post('/all-doctors', authAdmin, allDoctors)

adminRouter.post('/change-availability', authAdmin, changeAvailablity)

adminRouter.get('/appointments', authAdmin, appointmentsAdmin)

adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)

adminRouter.get('/dashboard', authAdmin, adminDashBoard)

export default adminRouter 

// after that head to server.js to intialize the endpoint we just created here 