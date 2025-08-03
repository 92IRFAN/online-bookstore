import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const loginUser = createAsyncThunk(
  'userAuth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post('/users/login', credentials);
      localStorage.setItem('token', res.data.token);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'userAuth/registerUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post('/users/register', credentials);
      localStorage.setItem('token', res.data.token);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);