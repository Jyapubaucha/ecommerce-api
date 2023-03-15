const express = require("express");
const {createUser, userLogin, getAllUser} = require("../controllers/userController")

const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);
router.get("/all-users", getAllUser);


module.exports = router;