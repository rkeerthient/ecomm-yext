import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm_disp: "",
  isLoading_disp: true,
  verticalKey_disp: "",
  results_disp: [],
};

const SearchbarSlice = createSlice({
  name: "search-bar",
  initialState,
  reducers: {
    setSearchTerm_disp: (state, action) => {
      state.searchTerm_disp = action.payload;
    },
    setVerticalKey_disp: (state, action) => {
      state.verticalKey_disp = action.payload;
    },
    resetState: (state) => {
      state = undefined;
    },
    setResetState_disp: (state) => {
      state.searchTerm_disp = "";
      state.isLoading_disp = true;
    },
    setResults_disp: (state, action) => {
      state.results_disp = action.payload;
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
  setResetState_disp,
} = SearchbarSlice.actions;
