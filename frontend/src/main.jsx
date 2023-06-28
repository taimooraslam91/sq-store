import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx';
import './assets/styles/index.scss';

import AdminRoute from './components/AdminRoute.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

import Home from './views/Home';
import LoginScreen from './views/LoginScreen.jsx';
import ProductScreen from './views/ProductScreen.jsx';
import CartScreen from './views/CartScreen.jsx';
import ShippingScreen from './views/ShippingScreen.jsx';
import PaymentScreen from './views/PaymentScreen.jsx';
import PlaceOrderScreen from './views/PlaceOrderScreen.jsx';
import OrderScreen from './views/OrderScreen.jsx';
import RegisterScreen from './views/RegisterScreen.jsx';
import ProfileScreen from './views/ProfileScreen.jsx';

import OrderListScreen from './views/Admin/OrderListScreen.jsx';
import ProductListScreen from './views/Admin/ProductListScreen.jsx';
import UserListScreen from './views/Admin/UserListScreen.jsx';
import ProductEditScreen from './views/Admin/ProductEditScreen.jsx';
import UserEditScreen from './views/Admin/UserEditScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/search/:search" element={<Home />} />
      <Route path="/page/:page" element={<Home />} />
      <Route path="/search/:search/page/:page" element={<Home />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route
          path="/admin/productlist/:page"
          element={<ProductListScreen />}
        />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
);
