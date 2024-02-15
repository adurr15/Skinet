import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelector, setPageNumber, setProductParams } from "./catalogSlice";
import { FormGroup, Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../App/components/RadioButtonGroup";
import CheckBoxButtons from "../../App/components/CheckBoxButtons";
import AppPagination from "../../App/components/AppPagination";
import LoadingComponent from "../../App/layout/LoadingComponent";

const sortOptions = [
  { value: 'Name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - hight to low ' },
  { value: 'price', label: 'Price - low to high' },


]

export default function Catalog() {
  const products = useAppSelector(productSelector.selectAll);
  const { productsLoaded, filtersLoaded, brands, types, productParams, metaData } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());

  }, [productsLoaded, dispatch]);

  useEffect(() => {

    if (!filtersLoaded) dispatch(fetchFilters());

  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded) return <LoadingComponent message="Loading Products" />;

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
        <RadioButtonGroup 
        selectedValue={productParams.orderBy}
        options={sortOptions}
        onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
        />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>

          <CheckBoxButtons 
           items={brands}
           checked={productParams.brands}
           onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}

          />

        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
           <CheckBoxButtons 
           items={types}
           checked={productParams.types}
           onChange={(items: string[]) => dispatch(setProductParams({types: items}))}

          />
          </FormGroup>

        </Paper>
      </Grid>
      <Grid item xs={9} >

        <ProductList products={products} />

      </Grid>

      <Grid item xs={3} />
      <Grid item xs={9} sx={{mb:2}} >
        {metaData &&
      <AppPagination 
        metaData={metaData}
        onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
      />}
      </Grid>


    </Grid>
  );
}
