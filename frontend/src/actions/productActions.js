import axios from "axios";
import { productActions } from "../store/product-slice";

export const getProducts =
  (searchKeyWord = "", currentPage = 1, price, category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch(productActions.loadingProducts());
      let link = `/api/v1/products?keyword=${searchKeyWord}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;
      if (category) {
        link = `/api/v1/products?keyword=${searchKeyWord}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
      }
      const { data } = await axios.get(link);
      dispatch(productActions.fetchedProducts(data));
      // dispatch({
      //   type: "ALL_PRODUCTS_SUCCESS",
      //   payload: data,
      // });
    } catch (error) {
      console.log(error);
      dispatch(productActions.fetchingFailed(error.response.data.message));
      // dispatch({
      //   type: "ALL_PRODUCTS_FAIL",
      //   payload: error.response.data.message,
      // });
    }
  };

export const clearProductErrors = () => async (dispatch) => {
  dispatch(productActions.clearErrors());
};
