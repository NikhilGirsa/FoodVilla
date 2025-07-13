import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./toggleSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userAuthSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    toggle: toggleReducer,
  },
});

export default store;
