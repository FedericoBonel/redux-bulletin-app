import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            transformResponse: (response) =>
                userAdapter.setAll(initialState, response),
            providesTags: (result, error, arg) => [
                { type: "User", id: "LIST" },
                ...result.ids.map((id) => ({ type: "User", id })),
            ],
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user,
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        deleteUser: builder.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: "DELETE",
                body: user.id,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id },
            ],
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: "PUT",
                body: user,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id },
            ],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
} = usersApiSlice;

const selectUserResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
    selectUserResult,
    (userResult) => userResult.data
);

export const { selectAll: selectAllUsers, selectById: selectUserById } =
    userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
