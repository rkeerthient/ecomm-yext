import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm_disp: "",
  isLoading_disp: true,
  verticalKey_disp: "",
  results_disp: [],
  resultsTotal_disp: 0,
  offset_disp: 0,
  loadMore_disp: false,
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
    setResetState_disp: (state) => {
      state.searchTerm_disp = "";
      state.isLoading_disp = true;
      state.loadMore_disp = false;
    },
    setLoadMore_disp: (state) => {
      state.offset_disp = state.offset_disp + 20;
      console.log(state.offset_disp);
    },
    setResultsTotal_disp: (state, action) => {
      state.resultsTotal_disp = action.payload;
    },
    setResults_disp: (state, action) => {
      state.results_disp = action.payload;
      state.isLoading_disp = false;
    },
    setisLoading_disp: (state, action) => {
      state.isLoading_disp = action.payload;
      // state.offset_disp = state.offset_disp + 20;
    },
    // setOffset_disp: (state) => {
    //   state.offset_disp = state.offset_disp + 20;
    // },
  },
});

export default SearchbarSlice.reducer;
export const {
  setSearchTerm_disp,
  setVerticalKey_disp,
  setResults_disp,
  setisLoading_disp,
  setResetState_disp,
  setResultsTotal_disp,
  setLoadMore_disp,
  setOffset_disp,
} = SearchbarSlice.actions;
