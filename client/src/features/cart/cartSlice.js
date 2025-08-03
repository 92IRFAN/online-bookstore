import { createSlice } from "@reduxjs/toolkit";

// Load initial cart from localStorage
const getInitialCart = () => {
  const localCart = localStorage.getItem("cartItems");
  return localCart ? JSON.parse(localCart) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getInitialCart(), // array of book items
  },
  reducers: {
    addToCart: (state, action) => {
      const book = action.payload;

      state.items.push({ ...book, quantity: 1 });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    increaseQty: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
