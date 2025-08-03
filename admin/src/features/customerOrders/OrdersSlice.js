import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOrders, updateOrderStatus } from "./OrdersThunk";

const adminOrdersSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    orders: [],
    error: null,
    statusUpdateSuccess: false,
    statusUpdateError: null,
  },
  reducers: {
    // Reset status update states
    resetStatusUpdateStates: (state) => {
      state.statusUpdateSuccess = false;
      state.statusUpdateError = null;
    },
  },
  extraReducers: (builder) => {

    // fetchAllOrders
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // updateOrderStatus
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.statusUpdateSuccess = false;
        state.statusUpdateError = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, updatedOrder } = action.payload;
        const index = state.orders.findIndex((order) => order._id === orderId);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
        state.statusUpdateSuccess = true;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.statusUpdateError = action.payload || "Failed to update order status.";
        state.statusUpdateSuccess = false;
      });
  },
});

export const { resetStatusUpdateStates } = adminOrdersSlice.actions;
export default adminOrdersSlice.reducer;