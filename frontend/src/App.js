import { Route, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "./store/index";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import UpdateUserProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ProtectedRoute from "./components/route/ProtectedRoute";
import NewPassword from "./components/user/NewPassword";
import ForgotPassword from "./components/user/ForgotPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import OrdersList from "./components/admin/OrdersList";
import OrderDetails from "./components/order/OrderDetails";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import Register from "./components/user/Register";
import ProcessOrder from "./components/admin/ProcessOrder";
import ListOrders from "./components/order/ListOrders";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import { loadUser } from "./actions/userAuthActions";

//adming imports
import Dashboard from "./components/admin/Dashboard";

// Stripe payment
import ProductsList from "./components/admin/ProductsList";
function App() {
  const { user, loading } = useSelector((state) => state.userAuth);
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    store.dispatch(loadUser());
    /// dispatch Clear Errors here to fix error on redirecting to login page
    async function getStripeApiKey() {
      try {
        const { data } = await axios.get("api/v1/payment/process");
        setStripeApiKey(data.stripeApiKey);
      } catch (err) {
        console.log("Please log in to purchase items");
      }
    }
    getStripeApiKey();
  }, []);
  return (
    <div className="App">
      <Header />

      <div className="container container-fluid">
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <ProtectedRoute path="/shipping" component={Shipping} exact />
        <ProtectedRoute path="/order/confirm" component={ConfirmOrder} exact />
        <ProtectedRoute path="/success" component={OrderSuccess} exact />
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/payment" component={Payment} exact />
          </Elements>
        )}
        <Route path="/search/:keyword" exact>
          <Home />
        </Route>

        <Route path="/products/:id" exact>
          <ProductDetails />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/password/forgot" exact>
          <ForgotPassword />
        </Route>
        <Route path="/password/reset/:token" exact>
          <NewPassword />
        </Route>
        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute path="/me/update" component={UpdateUserProfile} exact />
        <ProtectedRoute
          path="/order/details/:id"
          component={OrderDetails}
          exact
        />
        <ProtectedRoute path="/orders/me" component={ListOrders} exact />
        <ProtectedRoute
          path="/password/update"
          component={UpdatePassword}
          exact
        />
      </div>
      <ProtectedRoute
        path="/dashboard"
        isAdmin={true}
        component={Dashboard}
        exact
      />
      <ProtectedRoute
        path="/admin/products"
        isAdmin={true}
        component={ProductsList}
        exact
      />
      <ProtectedRoute
        path="/admin/product"
        isAdmin={true}
        component={NewProduct}
        exact
      />
      <ProtectedRoute
        path="/admin/order/:id"
        isAdmin={true}
        component={ProcessOrder}
        exact
      />
      <ProtectedRoute
        path="/admin/product/:id"
        isAdmin={true}
        component={UpdateProduct}
        exact
      />
      <ProtectedRoute
        path="/admin/orders"
        isAdmin={true}
        component={OrdersList}
        exact
      />
      <ProtectedRoute
        path="/admin/users"
        isAdmin={true}
        component={UsersList}
        exact
      />
      <ProtectedRoute
        path="/admin/user/:id"
        isAdmin={true}
        component={UpdateUser}
        exact
      />
      <ProtectedRoute
        path="/admin/reviews"
        isAdmin={true}
        component={ProductReviews}
        exact
      />

      {!loading && user && user.role !== "admin" && <Footer />}
    </div>
  );
}

export default App;
