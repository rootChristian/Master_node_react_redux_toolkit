import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "./api";

export const carouselsApi = createApi({
  reducerPath: "carouselsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
  endpoints: (builder) => ({
    getAllCarousels: builder.query({
      query: () => `carousels`,
    }),
  }),
});

export const { useGetAllCarouselsQuery } = carouselsApi;
