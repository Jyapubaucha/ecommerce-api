const express = require("express");
const {createUser, userLogin, 
    getAllUser, getSingleUser, 
    deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logOut} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);
router.get("/all-users", getAllUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logOut);
router.get("/:id", authMiddleware,isAdmin, getSingleUser);
router.delete("/:id", deleteUser);
router.put("/update-user", authMiddleware, isAdmin ,updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin ,blockUser);
router.put("/unblock-user/:id", authMiddleware,isAdmin ,unblockUser);


module.exports = router;