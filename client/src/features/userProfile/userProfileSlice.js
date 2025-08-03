import { createSlice } from '@reduxjs/toolkit';
import { fetchProfile, updateProfile } from './userProfileThunk';

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    profile: null,
    loading: false,
    error: null,
    success: false, // for profile update
  },
  reducers: {
    resetUserProfileState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {

    // fetchProfile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    
    // updateProfile
      builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserProfileState } = userProfileSlice.actions;
export default userProfileSlice.reducer;
