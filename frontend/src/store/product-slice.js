import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: null,
  },
  reducers: {
    loadingProducts(state, action) {
      state.loading = true;
    },
    fetchedProducts(state, action) {
      state.loading = false;
      state.resPerPage = action.payload.resPerPage;
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
      state.categories = action.payload.categoires; // Wrong spelling of categoires
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    fetchingFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state, action) {
      state.error = null;
    },
    // productsReducer(state, action) {
    //   switch (action.type) {
    //     case "ALL_PRODUCTS_REQUEST":
    //       return {
    //         loading: true,
    //         products: [],
    //       };
    //     case "ALL_PRODUCTS_SUCCESS":
    //       return {
    //         loading: false,
    //         products: action.payload.products,
    //         productsCount: action.payload.productsCount,
    //       };
    //     case "ALL_PRODUCTS_FAIL":
    //       return {
    //         loading: false,
    //         error: action.payload,
    //       };
    //     case "CLEAR_ERRORS":
    //       return {
    //         ...state,
    //         error: null,
    //       };

    //     default:
    //       return {
    //         loading: false,
    //         products: [],
    //       };
    //   }
    // },
    // replaceCart(state, action) {
    //   state.totalQuantity = action.payload.totalQuantity;
    //   state.items = action.payload.items;
    // },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
