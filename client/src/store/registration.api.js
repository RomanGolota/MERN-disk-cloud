import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiRegistration = createApi({
  reducerPath: 'registration/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
  }),
  tagTypes: ['Registration'],
  endpoints: (builder) => ({
    addNewUser: builder.mutation({
      query: (payload) => ({
        url: 'auth/registration',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Registration'],
    }),
  }),
})

export const { useAddNewUserMutation } = apiRegistration