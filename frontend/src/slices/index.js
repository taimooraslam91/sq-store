import { apiSlice } from './apiSlice';
import authReducer from './authSlice';
import cartSliceReducer from './cartSlice';

export default {
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  cart: cartSliceReducer,
};
