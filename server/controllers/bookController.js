const Book = require("../models/Book");

// Create Book
const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Book
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search books by title, author, or ISBN
const searchBooks = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Search query is required." });
    }

    const searchRegex = new RegExp(q, "i"); // case-insensitive

    const books = await Book.find({
      $or: [
        { title: { $regex: searchRegex } },
        { author: { $regex: searchRegex } },
        { ISBN: { $regex: searchRegex } },
      ],
    });

    res.status(200).json(books);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error while searching books." });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Failed to update book" });
  }
};

module.exports = { createBook, getBooks, getBookById, searchBooks, deleteBook, updateBook };
