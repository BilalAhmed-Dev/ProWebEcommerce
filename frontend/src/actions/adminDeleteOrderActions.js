import axios from "axios";
import { AdminAllOrderActions } from "../store/orderAdmin-slice";
/// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(AdminAllOrderActions.AdminDeleteOrderRequest());

    const { data } = await axios.delete(`/api/v1/order/admin/${id}`);
    dispatch(AdminAllOrderActions.AdminDeleteOrderSuccess(data.success));
  } catch (error) {
    dispatch(
      AdminAllOrderActions.AdminDeleteOrderFail(error.response.data.message)
    );
  }
};

export const AdminDeleteOrderReset = () => (dispatch) => {
  dispatch(AdminAllOrderActions.AdminDeleteOrderReset());
};
