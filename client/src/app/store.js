import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../features/userAuth/userAuthSlice";
import bookReducer from '../features/books/bookSlice'
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/order/orderSlice'
import userProfileReducer from '../features/userProfile/userProfileSlice'
import wishlistReducer from '../features/wishlist/wishlistSlice'

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    books: bookReducer,
    cart : cartReducer,
    order: orderReducer,
    userProfile : userProfileReducer,
    wishlist : wishlistReducer
  },
});

export default store;
