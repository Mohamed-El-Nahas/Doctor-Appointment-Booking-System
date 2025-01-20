import jwt from "jsonwebtoken"

// DOCTOR  authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const {doctoken} = req.headers
        if (!doctoken) {
            return res.json({success: false, message: "Not Authorized Login Again"})
        } 

        const token_decode = jwt.verify(doctoken, process.env.JWT_SECRET)

        req.body.docId = token_decode.id

        next()

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export default authDoctor