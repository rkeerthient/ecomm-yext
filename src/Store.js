import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./features/CartSlice";
import SearchbarSlice from "./features/SearchbarSlice";

export const store = configureStore({
  reducer: {
    searchReducer: SearchbarSlice,
    cartReducer: CartSlice,
  },
});
