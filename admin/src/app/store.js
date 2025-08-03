import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "../features/adminAuth/adminAuthSlice";
import bookReducer from '../features/books/bookSlice'
import ordersReducer from "../features/customerOrders/OrdersSlice"
import usersReducer from "../features/users/usersSlice"

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    books: bookReducer,
    customerOrders : ordersReducer,
    users : usersReducer,
  },
});

export default store;
