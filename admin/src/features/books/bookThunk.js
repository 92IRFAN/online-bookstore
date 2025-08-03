import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { getAuthHeaders } from "../../utils/getAuthHeaders";

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

// adding new book
export const addBook = createAsyncThunk(
  "books/addBook",
  async (bookData, { rejectWithValue }) => {
    try {
      const res = await api.post("/books/add", bookData, {
        headers: getAuthHeaders(),
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add book"
      );
    }
  }
);

// Deleting the book
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/books/${bookId}`, {
        headers: getAuthHeaders(),
      });
      return bookId;
    } catch (err) {
      return rejectWithValue(
        err.response.data.message || "Failed to delete book"
      );
    }
  }
);

// Updating the book
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, bookData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/books/${id}`, bookData, {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response.data.message || "Failed to update book"
      );
    }
  }
);
