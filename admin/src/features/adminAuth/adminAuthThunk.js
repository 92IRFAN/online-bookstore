import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const loginAdmin = createAsyncThunk(
  'adminAuth/loginAdmin',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post('/admin/login', credentials);
      localStorage.setItem('token', res.data.token);
      return res.data.admin;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);