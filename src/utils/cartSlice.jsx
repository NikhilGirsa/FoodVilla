// redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item } = action.payload;

      const existingIndex = state.cartItems.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          JSON.stringify(cartItem.customAddOn) ===
            JSON.stringify(item.customAddOn)
      );

      if (existingIndex !== -1) {
        state.cartItems[existingIndex].quantity += item.quantity;
      } else {
        state.cartItems.push({ ...item });
      }
    },

    updateItemQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === itemId);

      if (index !== -1) {
        if (newQuantity <= 0) {
          state.cartItems.splice(index, 1);
        } else {
          state.cartItems[index].quantity = newQuantity;
        }
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
