// 1- import mongoose.
import mongoose from "mongoose";


// 2- create a function for database connection.
const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))

    await mongoose.connect(`${process.env.MONGODB_URI}/appointment`)
}


// 3- export the database connection function.
export default connectDB

// -after saving the changes back to server.js file and import connectDB Function in it.