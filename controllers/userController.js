const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;

    //Find requested user is in database not
    const findUser = await User.findOne({ email: email });

    //If user is not found
    if (!findUser) {
        //Create new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else {
        throw new Error("User already exist.")
    }
});

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //Check user is already exist or not
    const findUser = await User.findOne({ email });

    //isPasswordMathched method from userModel.js
    if (findUser && await findUser.isPasswordMatched(password)) {
        res.json(findUser)
    } else { 
        throw new Error("Invalid Credentials")
    }
});


module.exports = { createUser, userLogin };