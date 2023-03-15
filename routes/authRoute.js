const express = require("express");
const {createUser, userLogin, getAllUser, getSingleUser, deleteUser, updateUser} = require("../controllers/userController")

const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);
router.get("/all-users", getAllUser);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);


module.exports = router;