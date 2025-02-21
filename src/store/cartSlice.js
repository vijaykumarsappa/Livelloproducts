import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, selectedSize } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.id === id && item.selectedSize === selectedSize
      );
      if (existingItem) {
        existingItem.quantity += 1;
        toast.success("Item quantity increased!");
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        toast.success("Item added to cart!");
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.selectedSize === action.payload.selectedSize
          )
      );
      toast.info("Item removed from cart!");
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) =>
              !(
                item.id === action.payload.id &&
                item.selectedSize === action.payload.selectedSize
              )
          );
          toast.info("Item removed from cart!");
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
