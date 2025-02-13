import doctorModel from "../models/doctors.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailablity = async (req, res) => {
    try {

        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success: true, message: 'Availablity Changed'})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({success:true, doctors})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API For Login as Doctor
const loginDoctor = async (req, res) => {

    try {

        const { email, password } = req.body

        const doctor = await doctorModel.findOne({email})

        if (!doctor) {
            return res.json({sucess: false, message: "Invalid credntials"})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            return res.json({sucess: false, message: "Invalid credntials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

// API FOR DISPLAYING DOCTOR APPOINTMENTS WHILE IN DOCTOR PANEL
const appointmentsDoctor = async (req, res) => {

    try {

        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })

        res.json({success: true, appointments})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

// API TO APPLY ON APPOINTMENT IN DOC PANEL
const appointmentComplete = async (req, res) => {

    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
            return res.json({success: true, message: 'Appointment Confirmed'})
        } else {
            return res.json({success: false, message: 'Mark Failed'})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

// API TO CANCEL ON APPOINTMENT IN DOC PANEL
const appointmentCancel = async (req, res) => {

    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
            return res.json({success: true, message: 'Appointment Declined'})
        } else {
            return res.json({success: false, message: 'Cancellation Failed'})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

// API TO GET DASHBOARD DATA FOR DOC PANEL
const doctorDashboard = async (req, res) => {

    try {

        const { docId } = req.body

        const appointments = await appointmentModel.find({ docId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }
        
        res.json({success: true, dashData})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

// API FOR DISPLAYING DOC PROFILE IN DOC PANEL
const doctorProfile = async (req, res) => {

    try {

        const {docId} = req.body

        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({success: true, profileData})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

// API FOR UPDATING DOC PROFILE
const updateDoctorProfile = async (req, res) => {

    try {

        const { docId, fees, address, available } = req.body

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

        res.json({success: true, message: 'Profile Updated Successfully'})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

export {
        changeAvailablity,
        doctorList,
        loginDoctor, 
        appointmentsDoctor, 
        appointmentComplete, 
        appointmentCancel, 
        doctorDashboard,
        doctorProfile,
        updateDoctorProfile
}