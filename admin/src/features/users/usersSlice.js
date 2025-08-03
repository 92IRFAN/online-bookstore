import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers, deleteUser, updateUser } from "./usersThunk";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    
    // fetchAllUsers
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // deleteUser
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = state.usersList.filter(
          (user) => user._id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // updateUser
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.usersList.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.usersList[index] = action.payload;
        }
      });
  },
});

export default usersSlice.reducer;
