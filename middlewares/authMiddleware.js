const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded.id);
                req.user = user;
                next();
            }

        }
        catch (err) {
            throw new Error("Not authorized! Token expired, Please login and try again");
        }
    } else {
        throw new Error("Token is not attached to header.")
    }
});


const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const userAdmin = await User.findOne({email});
    if(userAdmin.role !== "admin"){
        throw new Error("You are not a admin.")
    }
    else{
        next();
    }

})
module.exports = { authMiddleware, isAdmin };