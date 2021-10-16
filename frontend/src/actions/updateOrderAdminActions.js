import axios from "axios";
import { updateOrderActions } from "../store/updateOrderAdmin-slice";
export const updateOrder = (id, orderData) => async (dispatch, getState) => {
  try {
    dispatch(updateOrderActions.updateOrderRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/order/admin/${id}`,
      orderData,
      config
    );
    dispatch(updateOrderActions.updateOrderSuccess(data.success));
  } catch (error) {
    dispatch(updateOrderActions.updateOrderFail(error.response.data.message));
  }
};

export const updateOrderReset = () => (dispatch) => {
  dispatch(updateOrderActions.updateOrderReset());
};
export const clearUpdateOrderErrors = () => (dispatch) => {
  dispatch(updateOrderActions.clearErrors());
};
