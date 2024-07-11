import { api } from "./index";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: build.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    registerUser: build.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editUser: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} = userApi;
