import {
  useSearchActions,
  useSearchState,
  useSearchUtilities,
} from "@yext/search-headless-react";
import React, { FC, useEffect, useState } from "react";
import {
  ViewProps,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Typography } from "../styles";
import styled from "styled-components/native";
import { useProductsContext } from "../context/ProductsContext";
import SelectMultiple from "@horizonlime/react-native-select-multiple";

const { width, height } = Dimensions.get("window");
const TextIp = styled.TextInput`
  borderwidth: 1px;
  bordercolor: "#777";
  padding: 8px;
  width: 200px;
`;
export const SearchBar = ({ setResults, verticalKey }) => {
  // const [hideAutoComplete, setHideAutoComplete] = useState(false);
  // const [queryTerm, setQueryTerm] = useState("");
  // const searchActions = useSearchActions();
  // const query = useSearchState((state) => state.query.query);
  // // const { setProductResults } = useProductsContext();
  // const [facetSet, isFacetSet] = useState(false);
  // const [selectedFruits, setSelectedFruits] = useState([]);

  // const fruits = [
  //   { label: "Apples", value: "appls", disable: false },
  //   { label: "Oranges", value: "orngs", disable: true },
  //   { label: "Pears", value: "pears", disable: false },
  // ];
  // const facet = useSearchState((state) => state.filters.facets);
  // const loading =
  //   useSearchState((state) => state.searchStatus.isLoading) || false;
  // const handleSearch = () => {
  //   searchActions.setQuery(queryTerm);
  //   searchActions.setVertical(verticalKey);
  //   searchActions.executeVerticalQuery().then((res) => {
  //     setProds(res.verticalResults.results);
  //     isFacetSet(true);
  //   });
  // };

  // // useEffect(() => {
  // //   searchActions.setQuery("");
  // //   searchActions.setVertical(verticalKey);
  // //   searchActions.executeVerticalQuery().then((res) => {
  // //     setProds(res.verticalResults.results);
  // //   });
  // // }, []);

  // const renderLabel = (label) => (
  //   <Text style={styles.checkboxText}>{label} </Text>
  // );
  // const getFacetOptions = () => {
  //   if (facet) {
  //     return facet && facet.options.map((option) => option.displayName);
  //   } else {
  //     return [];
  //   }
  // };
  // const onFacetSelection = (inp) => {
  //   console.log(JSON.stringify(inp));
  // };

  // const onSelectionsChange = (selectedFruits) => {
  //   setSelectedFruits({ selectedFruits });
  // };

  // return (
  //   <>
  //     {
  //       <View>
  //         <TextInput
  //           style={styles.textInp}
  //           value={queryTerm}
  //           onChangeText={(text) => setQueryTerm(text)}
  //         />
  //         {!loading && (
  //           <SelectMultiple
  //             renderLabel={renderLabel}
  //             items={getFacetOptions()}
  //             selectedItems={
  //               facet?.options
  //                 .filter((option) => option.selected === true)
  //                 .map((option) => option.displayName) || []
  //             }
  //             onSelectionsChange={(selectedItems) =>
  //               onFacetSelection(selectedItems)
  //             }
  //           />
  //         )}
  //         {/* <SelectMultiple
  //       items={getFacetOptions}
  //       selectedItems={selectedFruits}
  //       onSelectionsChange={onSelectionsChange}
  //     /> */}
  //         <Button
  //           style={{ borderWidth: 1 }}
  //           title="Press me"
  //           onPress={handleSearch}
  //         />
  //       </View>
  //     }
  //   </>
  // );
  const [open, setOpen] = useState(false);
  const [facetWasPressed, setFacetWasPressed] = useState(false);
  const searchLoading = useAnswersState(
    (state) => state.vertical.searchLoading
  );
  const facet = useAnswersState((state) => state.filters.facets)?.find(
    (f) => f.displayName == filterName
  );

  const selectedFacetOptions =
    facet?.options
      .filter((option) => option.selected === true)
      .map((option) => option.displayName) || [];

  const allFacetOptions =
    facet?.options.map((option) => option.displayName) || [];
  useEffect(() => {
    if (facetWasPressed) {
      answersActions.executeVerticalQuery();
      setFacetWasPressed(false);
    }
  }, [facetWasPressed]);

  const getFacetOptions = () => {
    if (facet) {
      if (typeof sort === "function") {
        return sort(facet?.options.map((option) => option.displayName));
      } else {
        return facet?.options.map((option) => option.displayName);
      }
    } else {
      return [];
    }
  };
  const onFacetSelection = (checkedRows) => {
    const facetFieldId = facet?.fieldId;
    const checkedRowValues = checkedRows.map((cr) => cr.value);

    if (facetFieldId) {
      allFacetOptions.forEach((option) => {
        if (
          checkedRowValues.includes(option) &&
          !selectedFacetOptions.includes(option)
        ) {
          answersActions.selectFacetOption(facetFieldId, {
            matcher: Matcher.Equals,
            value: option,
          });
        } else if (
          !checkedRowValues.includes(option) &&
          selectedFacetOptions.includes(option)
        ) {
          answersActions.unselectFacetOption(facetFieldId, {
            matcher: Matcher.Equals,
            value: option,
          });
        }
      });
    }
    setFacetWasPressed(true);
  };

  const renderLabel = (label: string) => (
    <Text style={styles.checkboxText}>
      {typeof transform === "function" ? transform(label) : label}
    </Text>
  );

  return (
    <View style={styles.filterContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.font}>{displayName || filterName}</Text>
      </View>

      <SelectMultiple
        rowStyle={styles.rowStyle}
        labelStyle={styles.checkboxText}
        renderLabel={renderLabel}
        items={getFacetOptions()}
        selectedItems={
          facet?.options
            .filter((option) => option.selected === true)
            .map((option) => option.displayName) || []
        }
        onSelectionsChange={(selectedItems) => onFacetSelection(selectedItems)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textInp: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  filterContainer: {
    backgroundColor: Colors.offWhite,
    width: width * 0.235,
    marginRight: 10,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
  },
  font: {
    ...Typography.bodyFont,
    fontSize: 12,
    marginRight: 8,
  },
  animatedContainer: {
    position: "absolute",
    marginTop: 31,
    width: width * 0.235,
  },
  checkboxText: {
    ...Typography.bodyFont,
    fontSize: 12,
  },
  rowStyle: {
    paddingVertical: 7.5,
    backgroundColor: Colors.offWhite,
    height: 40,
  },
});
