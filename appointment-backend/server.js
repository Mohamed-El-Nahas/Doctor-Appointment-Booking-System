import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// imported connectDB Function from mongodb.js.
import connectDB from './config/mongodb.js'

// imported connectCloudinary Function from cloudinary.js
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'


// app configration 

const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()

// define middlewares 

app.use(express.json())
app.use(cors())

// API END-POINTS

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('api work on port 5000 successfully')
})

app.listen(port, () => console.log("server started successfully", port))