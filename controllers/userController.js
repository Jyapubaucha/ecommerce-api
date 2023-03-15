const User = require("../models/userModel");

const createUser = async (req, res) => {
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
        res.json({
            message: "User already exists",
            success: false
        });
    }
};

module.exports = { createUser };