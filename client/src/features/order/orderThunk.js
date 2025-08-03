import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { getAuthHeaders } from "../../utils/getAuthHeaders";

// to place order
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await api.post("/orders/place-order", orderData, {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Order failed");
    }
  }
);

// to fecth user orders
export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/orders/my-orders", {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch orders"
      );
    }
  }
);
