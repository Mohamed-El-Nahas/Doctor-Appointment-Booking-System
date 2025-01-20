// 1- import cloudinary package.
import { v2 as cloudinary } from 'cloudinary'


// 2- create a function for cloudinary connection.
const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET_KEY
    })
}



// 3- export cloudinary connection function.
export default connectCloudinary

// 4-after saving the changes back to server.js file and import connectCloudinary Function in it.