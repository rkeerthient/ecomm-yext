import { useSearchActions } from "@yext/search-headless-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setResults_disp } from "../features/SearchbarSlice";

const useSearch = () => {
  const { verticalKey_disp, searchTerm_disp } = useSelector(
    (state) => state.searchReducer
  );
  const searchActions = useSearchActions();
  const dispatch = useDispatch();
  useEffect(() => {
    if (verticalKey_disp) {
      console.log(searchTerm_disp, "---");
      searchTerm_disp
        ? searchActions.setQuery(searchTerm_disp)
        : searchActions.setQuery("");
      searchActions.setVertical(verticalKey_disp);
      searchActions.executeVerticalQuery().then((res) => {
        res && dispatch(setResults_disp(res.verticalResults.results));
      });
    }
  }, [verticalKey_disp, searchTerm_disp]);
};

export default useSearch;
