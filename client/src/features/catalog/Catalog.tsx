import LoadingComponent from "../../App/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchProductsAsync, productSelector } from "./catalogSlice";

export default function Catalog() {
  const products = useAppSelector(productSelector.selectAll);
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  if (status.includes("pending"))
    return <LoadingComponent message="Loading Products" />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
