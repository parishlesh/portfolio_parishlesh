const jwt = require("jsonwebtoken");
const User = require("../models/user-models");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")
    
    // console.log("Received Token:", token);
    if (!token) {
        return res.status(401).json({ message: "unauthorized HTTP, Token not provided" })
    }
    const jwtToken = token.replace('Bearer', "").trim();
    // console.log("JWT Token after replace:", jwtToken)

    try {
        const isVarified = jwt.verify(jwtToken, process.env.JWT_KEY)
        // console.log("Token Verified:", isVarified);

        const userData = await User.findOne({email: isVarified.email }).select({password: 0})
        // console.log("User Data:", userData)

        if (!userData) {
            return res.status(401).json({ message: "Unauthorized HTTP, Invalid token" });
        }
         req.User = userData
         req.token= token
         req.userID = userData._id
        next();
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        res.status(401).json({ message: "Unauthorized HTTP, Invalid token" });
    }
    // console.log("req.user set by authMiddleware:", req.User);

}
module.exports = authMiddleware;