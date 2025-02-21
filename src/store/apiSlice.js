import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    getCategories: builder.query({
      query: () => "/products/categories",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
} = apiSlice;
