import axios from "axios";
import { OrderActions } from "../store/order-slice";
import { myOrderActions } from "../store/myOrders-slice";
import { orderDetailsActions } from "../store/orderDetails-slice";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(OrderActions.createOrderRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/order/new", order, config);
    dispatch(OrderActions.createOrderSuccess(data));
  } catch (error) {
    dispatch(OrderActions.createOrderFail(error.response.data.message));
  }
};

/// get currently logged in user orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch(myOrderActions.myOrdersRequest());
    const { data } = await axios.get("/api/v1/order/me");
    dispatch(myOrderActions.myOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(myOrderActions.myOrdersFail(error.response.data.message));
  }
};
/// get order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailsActions.orderDetailsRequest());
    const { data } = await axios.get(`/api/v1/order/${id}`);
    dispatch(orderDetailsActions.orderDetailsSuccess(data.order));
  } catch (error) {
    dispatch(orderDetailsActions.orderDetailsFail(error.response.data.message));
  }
};

// clear Errors
export const clearOrderErrors = () => async (dispatch) => {
  dispatch(OrderActions.clearErrors());
};
