import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import rootReducer from './slices';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
