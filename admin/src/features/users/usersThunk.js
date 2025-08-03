import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { getAuthHeaders } from "../../utils/getAuthHeaders";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users", {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch users"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/users/${userId}`, {
        headers: getAuthHeaders(),
      });
      return userId;
    } catch (err) {
      return rejectWithValue(
        err.response.data.message || "Failed to delete user"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, updatedData }, thunkAPI) => {
    try {
      const res = await api.put(`/users/${userId}`, updatedData, {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || "Failed to update user"
      );
    }
  }
);
