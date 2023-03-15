const express = require("express");
const {createUser, userLogin, getAllUser, getSingleUser, deleteUser} = require("../controllers/userController")

const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);
router.get("/all-users", getAllUser);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);


module.exports = router;