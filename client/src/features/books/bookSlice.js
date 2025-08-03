import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks, fetchBookById, searchBooks } from "./bookThunk";

const initialState = {
  loading: false,
  books: [],
  error: null,
  book: null,
  searchLoading: false, 
  searchResults: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearBook: (state) => {
      state.book = null;
    },
    clearResults: (state) => {
      state.searchResults = [];
      state.searchLoading = false;
    },
  },
  extraReducers: (builder) => {
    // fetchBooks
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    // fetchBookById
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.book = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    // searchBooks
    builder
      .addCase(searchBooks.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
        state.searchResults = [];
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBook, clearResults } = bookSlice.actions;
export default bookSlice.reducer;