import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { getAuthHeaders } from "../../utils/getAuthHeaders";

export const fetchProfile = createAsyncThunk(
  'userProfile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/users/profile", {
        headers: getAuthHeaders(),
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'userProfile/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/users/profile", formData, {
        headers: getAuthHeaders(),
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Profile update failed');
    }
  }
);
