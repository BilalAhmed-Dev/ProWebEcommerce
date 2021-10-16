import { AdminAllOrderActions } from "../store/orderAdmin-slice";
import axios from "axios";

// Get all orders - ADMIN
export const allOrders = () => async (dispatch) => {
  try {
    dispatch(AdminAllOrderActions.AdminAllOrderRequest());
    const { data } = await axios.get(`/api/v1/order/admin/allorders`);
    dispatch(AdminAllOrderActions.AdminAllOrderSuccess(data));
  } catch (error) {
    dispatch(
      AdminAllOrderActions.AdminAllOrderFail(error.response.data.message)
    );
  }
};

// clear Errors
export const clearOrderErrors = () => async (dispatch) => {
  dispatch(AdminAllOrderActions.clearErrors());
};
