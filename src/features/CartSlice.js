import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotals: 0,
  cartPrice: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reducer1: (state) => {
      state.cartTotals = 0;
    },
  },
});

export default cartSlice.reducer;
export const { reducer1 } = cartSlice.actions;
