import React, { useState } from "react";
import { useContext } from "react";

const ProductsContext = React.createContext<any>({});

export const ProductsProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [productResults, setProductResults] = useState([]);
  return (
    <ProductsContext.Provider
      value={{
        productResults,
        setProductResults,
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
