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
