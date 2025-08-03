const User = require("../models/User");
const Book = require("../models/Book");

// Add book to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Find user and update wishlist
    const user = await User.findById(userId);

    // Check if book is already in wishlist
    if (user.wishlist.includes(bookId)) {
      return res.status(400).json({ message: "Book already in wishlist" });
    }

    user.wishlist.push(bookId);
    await user.save();

    res.status(200).json({
      message: "Book added to wishlist successfully",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove book from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);

    // Remove book from wishlist
    user.wishlist = user.wishlist.filter((id) => id.toString() !== bookId);
    await user.save();

    res.status(200).json({
      message: "Book removed from wishlist successfully",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's wishlist
const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: "wishlist",
      select: "title author price cover category description isbn stock",
    });

    res.status(200).json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
