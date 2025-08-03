const express = require("express");
const { protect, adminAuth } = require('../middleware/auth');
const { createBook, getBooks, getBookById, searchBooks, deleteBook, updateBook } = require('../controllers/bookController');

const router = express.Router();

// Public Routes 
router.get("/search", searchBooks);
router.get('/', getBooks);

// Admin Routes 
router.post('/add', protect, adminAuth, createBook);
router.put("/:id", protect, adminAuth, updateBook);
router.delete("/:id", protect, adminAuth, deleteBook);

// Generic route
router.get("/:id", getBookById);

module.exports = router;