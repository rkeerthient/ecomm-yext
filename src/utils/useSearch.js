import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setResults_disp,
  setResultsTotal_disp,
  setFacets_disp,
} from "../features/SearchbarSlice";

const useSearch = () => {
  const { verticalKey_disp, searchTerm_disp, offset_disp } = useSelector(
    (state) => state.searchReducer
  );
  const searchActions = useSearchActions();
  const dispatch = useDispatch();
  const facet = useSearchState((state) => state.filters.facets);
  useEffect(() => {
    facet && dispatch(setFacets_disp(facet));
  }, [facet]);
  useEffect(() => {
    if (verticalKey_disp) {
      searchTerm_disp
        ? searchActions.setQuery(searchTerm_disp)
        : searchActions.setQuery("");
      searchActions.setVertical(verticalKey_disp);
      searchActions.setOffset(offset_disp);
      searchActions.executeVerticalQuery().then((res) => {
        dispatch(setResults_disp(res.verticalResults.results));
        dispatch(setResultsTotal_disp(res.verticalResults.resultsCount));
      });
    }
  }, [offset_disp, verticalKey_disp, searchTerm_disp]);
};

export default useSearch;
