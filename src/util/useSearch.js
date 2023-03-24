import { useSearchActions } from "@yext/search-headless-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResults_disp } from "../features/SearchbarSlice";

const useSearch = () => {
  const dispatch = useDispatch();
  const { verticalKey_disp, searchTerm } = useSelector(
    (state) => state.searchReducer
  );
  const searchActions = useSearchActions();
  useEffect(() => {
    if (verticalKey_disp) {
      searchTerm && searchActions.setQuery(searchTerm);
      searchActions.setVertical(verticalKey_disp);
      searchActions.executeVerticalQuery().then((res) => {
        dispatch(setResults_disp(res.verticalResults.results));
      });
    }
  }, [searchTerm, verticalKey_disp]);
};

export default useSearch;
