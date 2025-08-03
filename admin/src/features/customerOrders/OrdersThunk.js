import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthHeaders } from "../../utils/getAuthHeaders";
import api from "../../services/api";

export const fetchAllOrders = createAsyncThunk(
  "customerOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/orders", {
        headers: getAuthHeaders(),
      });
      console.log(res.data);
      
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "customerOrders/updateStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        `/orders/${orderId}/status`,
        {
          orderStatus: status,
        },
        {
          headers: getAuthHeaders(),
        }
      );
      return { orderId, updatedOrder: res.data };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to Update Status"
      );
    }
  }
);
