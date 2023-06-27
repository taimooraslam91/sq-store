import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ search, page, limit }) => ({
        url: PRODUCTS_URL,
        params: { search, page, limit },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),
    getProductDetail: builder.query({
      query: (id) => ({ url: `${PRODUCTS_URL}/${id}` }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailQuery } =
  productsApiSlice;
