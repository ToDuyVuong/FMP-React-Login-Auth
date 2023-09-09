import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL_FMP } from "../../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL_FMP });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
