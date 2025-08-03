const express = require("express");
const {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const { protect, adminAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, adminAuth, getUsers);

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

router.put("/:id", protect, adminAuth, updateUser);
router.delete("/:id", protect, adminAuth, deleteUser);

module.exports = router;
