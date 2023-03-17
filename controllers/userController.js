const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwToken");

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
        res.json({
            _id: findUser._id,
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            email: findUser.email,
            mobile: findUser.mobile,
            role: findUser.role,
            token: generateToken(findUser?._id)
        })
    } else {
        throw new Error("Invalid Credentials")
    }
});


//Get all user from database
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error)
    }
})

//Get a single user
const getSingleUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getUser = await User.findById(id);
        res.json(getUser);
    } catch (error) {
        throw new Error(error)
    }
})

//Delete user with id
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser);
    } catch (error) {
        throw new Error(error)
    }
})

//Update a user with id
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const updateUser = await User.findByIdAndUpdate(_id,
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                mobile: req.body.mobile
            },
            { new: true });
        res.json(updateUser);
    } catch (error) {
        throw new Error(error)
    }
})

const blockUser = asyncHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const block = await User.findByIdAndUpdate(id,
            {
            isBlocked: true,
        },{
            new: true
        })
        res.json({
            message:"User blocked"
        });
    }
    catch (error) {
        throw new Error(error)
    }
});

const unblockUser = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const unblock = await User.findByIdAndUpdate(id,
            {
                isBlocked: false,
            },
            {
                new: true
            });
            res.json({
                message:"User unblocked"
            });
    }
    catch (error) {
        throw new Error(error)
    }
});


module.exports = {
    createUser,
    userLogin, getAllUser,
    getSingleUser, deleteUser,
    updateUser, blockUser, unblockUser
};