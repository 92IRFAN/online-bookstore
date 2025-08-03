const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlistController");

router.post("/add/:bookId", protect, addToWishlist);
router.delete("/remove/:bookId", protect, removeFromWishlist);
router.get("/", protect, getWishlist);

module.exports = router;
