import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// fetching all books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/books");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch books"
      );
    }
  }
);

// fetching a single book by ID
export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/books/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch the book"
      );
    }
  }
);

// Search books by title, author, or ISBN
export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async (query, { rejectWithValue }) => {
    try {
      const res = await api.get(`/books/search?q=${query}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);