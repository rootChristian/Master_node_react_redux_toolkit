import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "./api";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => `categories`,
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApi;
