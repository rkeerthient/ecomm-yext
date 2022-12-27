import React, { FC, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import SelectMultiple from "@horizonlime/react-native-select-multiple";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { Matcher } from "@yext/search-core";
import { Colors, Typography } from "../styles";
import { useProductsContext } from "../context/ProductsContext";

const { width, height } = Dimensions.get("window");

interface IFacetDrawerProps extends ViewProps {
  filterName: string;
  displayName?: string;
  transform?: (value: string) => string;
  sort?: (value: string[]) => string[];
}

export interface Selection {
  label: string;
  value: string;
}

export const FacetDrawer: FC<IFacetDrawerProps> = ({
  filterName,
  displayName,
  transform,
  sort,
}) => {
  const [open, setOpen] = useState(true);
  const [facetWasPressed, setFacetWasPressed] = useState(false);

  const flipAnimation = useRef(new Animated.Value(0)).current;
  const expandAnimation = useRef(new Animated.Value(0)).current;
  const { setProductResults } = useProductsContext();

  const answersActions = useSearchActions();
  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);
  const facet = useSearchState((state) => state.filters.facets)?.find(
    (f) => f.displayName == filterName
  );

  const selectedFacetOptions =
    facet?.options
      .filter((option) => option.selected === true)
      .map((option) => option.displayName) || [];

  const allFacetOptions =
    facet?.options.map((option) => option.displayName) || [];

  const getFlipAnimation = () => {
    const rotate = flipAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });

    return { rotate };
  };
  useEffect(() => {
    if (open) {
      Animated.timing(expandAnimation, {
        toValue: 320,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(expandAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    Animated.timing(flipAnimation, {
      toValue: open ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [open]);

  useEffect(() => {
    if (facetWasPressed) {
      answersActions
        .executeVerticalQuery()
        .then((res) => setProductResults(res.verticalResults.results));
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
          answersActions.setFacetOption(
            facetFieldId,
            {
              matcher: Matcher.Equals,
              value: option,
            },
            true
          );
        } else if (
          !checkedRowValues.includes(option) &&
          selectedFacetOptions.includes(option)
        ) {
          answersActions.setFacetOption(
            facetFieldId,
            {
              matcher: Matcher.Equals,
              value: option,
            },
            false
          );
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
      <View style={styles.animatedContainer}>
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
          onSelectionsChange={(selectedItems: React.SetStateAction<never[]>) =>
            onFacetSelection(selectedItems)
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    width: width - 100,
    alignItems: "center",
    height: 150,
  },
  textContainer: {
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
    width: width - 40,
  },
  checkboxText: {
    ...Typography.bodyFont,
    fontSize: 12,
  },
  rowStyle: {
    paddingVertical: 7.5,
    height: 30,
    overflow: "scroll",
  },
});
