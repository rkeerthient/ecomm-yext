import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  isLoading_disp: true,
  verticalKey_disp: "",
  results: [],
};

const SearchbarSlice = createSlice({
  name: "search-bar",
  initialState,
  reducers: {
    setSearchTerm_disp: (state, action) => {
      state.searchTerm = action.payload;
    },
    setVerticalKey_disp: (state, action) => {
      state.verticalKey_disp = action.payload;
    },
    setResults_disp: (state, action) => {
      state.results = action.payload;
      state.isLoading_disp = false;
    },
    setisLoading_disp: (state, action) => {
      state.isLoading_disp = action.payload;
    },
  },
});

export default SearchbarSlice.reducer;
export const {
  setSearchTerm_disp,
  setVerticalKey_disp,
  setResults_disp,
  setisLoading_disp,
} = SearchbarSlice.actions;
