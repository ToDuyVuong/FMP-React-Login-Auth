import { apiSlice } from "./apiSlice";
import { BASE_URL_FMP, BASE_URL_FMP_AUTH } from "../../constants";


const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL_FMP_AUTH}/register`,
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL_FMP_AUTH}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    logout: builder.mutation({
      query: (token) => ({
        url: `${BASE_URL_FMP_AUTH}/logout`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }),
    }),

    test: builder.mutation({
      query: (token) => ({
        url: `${BASE_URL_FMP}/test`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }),
    }),

    refreshAccessToken: builder.mutation({
      query: ( token) => ({
        url: `${BASE_URL_FMP_AUTH}/refresh-token`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useTestMutation,
  useRefreshAccessTokenMutation,
} = userSlice;
