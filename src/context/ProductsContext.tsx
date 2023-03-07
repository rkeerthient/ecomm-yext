import React, { useState } from "react";
import { useContext } from "react";

const ProductsContext = React.createContext<any>({});

export const ProductsProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [productResults, setProductResults] = useState([]);
  const [facets, setFacets] = useState([]);
  return (
    <ProductsContext.Provider
      value={{
        productResults,
        setProductResults,
        facets,
        setFacets,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
