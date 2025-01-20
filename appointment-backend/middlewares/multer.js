import multer from "multer";


const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
})


const upload = multer({storage})


export default upload 

// // Import the multer library, which is used for handling multipart/form-data,
// // primarily used for uploading files.
// import multer from "multer";

// // Configure the storage settings for multer.
// // Here, we are using diskStorage to store files on the disk.
// const storage = multer.diskStorage({
//     // Define the filename function to customize the name of the uploaded file.
//     filename: function(req, file, callback) {
//         // The callback function is called with two arguments:
//         // 1. An error (null in this case, indicating no error).
//         // 2. The name of the file to be saved on the server.
//         // We use the original name of the uploaded file.
//         callback(null, file.originalname);
//     }
// });

// // Create an instance of multer with the specified storage configuration.
// // This instance will be used to handle file uploads in routes.
// const upload = multer({ storage });

// // Export the upload instance so it can be used in other parts of the application,
// // such as in route handlers for processing file uploads.
// export default upload;