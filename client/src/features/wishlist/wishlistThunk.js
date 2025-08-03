import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { getAuthHeaders } from "../../utils/getAuthHeaders";

// Get user's wishlist
export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/wishlist", {
        headers: getAuthHeaders(),
      });      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

// Add book to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/wishlist/add/${bookId}`,
        {},
        {
          headers: getAuthHeaders(),
        }
      );
      return { ...response.data, bookId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to wishlist"
      );
    }
  }
);

// Remove book from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/wishlist/remove/${bookId}`,
        
        {
          headers: getAuthHeaders(),
        }
      );
      return { ...response.data, bookId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from wishlist"
      );
    }
  }
);
