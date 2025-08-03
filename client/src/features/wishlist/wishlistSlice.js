import { createSlice } from "@reduxjs/toolkit";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "./wishlistThunk";

// Load from localStorage if available
const savedWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];

const initialState = {
  isLoading: false,
  wishlist: savedWishlist,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlistError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get wishlist
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlist = action.payload.wishlist;

        // Save to localStorage
        localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add to wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;

        const exists = state.wishlist.find(
          (item) => item._id === action.payload._id
        );

        if (!exists) {
          state.wishlist.push(action.payload);
          localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
        }
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Remove from wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlist = state.wishlist.filter(
          (book) => book._id !== action.payload.bookId
        );
        localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlistError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
