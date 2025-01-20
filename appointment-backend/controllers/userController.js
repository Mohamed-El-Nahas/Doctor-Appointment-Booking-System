import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/users.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctors.js'
import appointmentModel from '../models/appointmentModel.js'

// API For Sign-up
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({success: false, message: "Missing Details"})
        }

        // validating email
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Enter a valid E-mail"})
        }

        // validating password
        if (password.length < 8) {
            return res.json({success: false, message: "Password must be more than 8 characters"})
        }

        // hashing password for user
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        // _id
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
} 

// API For user login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})

        if (!user) {
           return res.json({success: false, message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.json({success: true, token })
        } else {
            res.json({success: false, message: 'Wrong Password'})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
} 

// API To get user profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({success: true, userData})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API For updating user profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body

        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({success: false, message: "Data Missing"})
        }

        await userModel.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), dob, gender})

        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'})
            const imageURL = imageUpload.secure_url
            
            await userModel.findByIdAndUpdate(userId, {image: imageURL})
        }

        res.json({success: true, message: "Profile Updated"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API For Booking Appointment
const BookAppointment = async (req, res) => {
    try {

        const { userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({success: false, message: "Doctor not available"})
        }

        let slots_booked = docData.slots_booked

        // checking for available slots
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({success: false, message: "Slot not available, please check another slot"})
            } else {
                slots_booked[slotDate].push(slotTime)
            } 
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in Doctor data
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success: true, message: 'Appointment Booked Successfully'})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API TO GET USER APPOINTMENTS TO MAKE IT APPEAR IN USER APPOINTMENTS PAGE
const listAppointment = async (req, res) => {

    try {
        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({success: true, appointments})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

// API For Cancelling the appointment
const cancelAppointment = async (req, res) => {

    try {

       const { userId, appointmentId } = req.body 

       const appointmentData = await appointmentModel.findById(appointmentId)

       // verify appointment for user
       if (appointmentData.userId !== userId) {
        return res.json({success: false, message: "Unauthorized action"})
       }   

       await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})

      // releasing doctor slot 
      const { docId, slotDate, slotTime } = appointmentData

      const doctorData = await doctorModel.findById(docId)

      let slots_booked = doctorData.slots_booked

      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

      await doctorModel.findByIdAndUpdate(docId, {slots_booked})

      res.json({success: true, message: "Appointment Cancelled Successfully"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

// API For Clearing All Appointments
const clearAllAppointments = async (req, res) => {
    try {
        const { userId } = req.body;

        // Delete all appointments for the user
        const result = await appointmentModel.deleteMany({ userId });

        if (result.deletedCount === 0) {
            return res.json({ success: false, message: "No appointments found to delete." });
        }

        res.json({ success: true, message: "All appointments cleared successfully." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



export {registerUser, loginUser, getProfile, updateProfile, BookAppointment, listAppointment, cancelAppointment, clearAllAppointments}