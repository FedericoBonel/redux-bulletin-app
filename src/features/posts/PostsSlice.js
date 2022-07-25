import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";

// Sets the date and reactions for the posts in case they don't already have it in the back end
const transformPost = (post) => {
    if (!post?.date) post.date = new Date().toISOString();
    if (!post?.reactions)
        post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        };
    return post;
};

// Creates the postSlice adapter for selectors and normalized state auto creation (sorting ids by date)
const postAdapter = createEntityAdapter({
    sortComparer: (post1, post2) => post2.date.localeCompare(post1.date),
});

const initialState = postAdapter.getInitialState();

// Extend apiSlice with posts endpoints
export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => "/posts",
            transformResponse: (response) => {
                const loadedPosts = response.map((post) => transformPost(post));
                // Normalize data and post slice and return the updated state
                return postAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => [
                // To re-fetch when the list gets invalidated
                { type: "Post", id: "LIST" },
                // To re-fetch when a specific post changes and gets invalidated
                // (Get all ids from the posts slice state [result] and create tags for each one with their ids)
                ...result.ids.map((id) => ({ type: "Post", id })),
            ],
        }),
        getPostsByUserId: builder.query({
            query: (userId) => `/posts?userId=${userId}`,
            transformResponse: (response) => {
                const loadedPosts = response.map((post) => transformPost(post));
                // Normalize data and post slice and return the updated state
                return postAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => [
                // We only need to re fetch this if any of these posts gets invalidated (since is for a specific user)
                ...result.ids.map((id) => ({ type: "Post", id: id })),
            ],
        }),
        addNewPost: builder.mutation({
            query: (newPost) => ({
                url: "/posts",
                method: "POST",
                body: {
                    ...newPost,
                    userId: Number(newPost.userId),
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    },
                },
            }),
            invalidatesTags: [{ type: "Post", id: "LIST" }],
        }),
        updatePost: builder.mutation({
            query: (updatedPost) => ({
                url: `/posts/${updatedPost.id}`,
                method: "PUT",
                body: {
                    ...updatedPost,
                    userId: Number(updatedPost.userId),
                    date: new Date().toISOString(),
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Post", id: arg.id }, // For that specific post
            ],
        }),
        deletePost: builder.mutation({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: "DELETE",
                body: post.id,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Post", id: arg.id },
            ],
        }),
        addReaction: builder.mutation({
            query: ({ postId, reactions }) => ({
                url: `/posts/${postId}`,
                method: "PATCH",
                body: { reactions },
            }),
            // Update the cache before the data gets persisted in the back-end
            // This is an optimistic update (we assume it's going to happen) hence invalidation of cache is not necessary
            // we just update the cache optimistically and "hope for the best" without re-fetching anything
            async onQueryStarted(
                { postId, reactions },
                // queryFulfilled is a promise that contains the state of the update
                // dispatch is the good old dispatch of actions
                { dispatch, queryFulfilled }
            ) {
                // Update the cache for the getPosts endpoint (draft is a draft of our state)
                const patchResult = dispatch(
                    postsApiSlice.util.updateQueryData(
                        "getPosts",
                        undefined,
                        (draft) => {
                            const post = draft.entities[postId];
                            if (post) post.reactions = reactions;
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    // If the promise (i.e the update) threw an error, just undo the patch in cache
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useDeletePostMutation,
    useUpdatePostMutation,
    useAddReactionMutation,
} = postsApiSlice;

// Selector to get a hold of the result object (Not just the data) of the getPosts query
const selectPostsResult = postsApiSlice.endpoints.getPosts.select();

// Selector to get a hold of the posts data
const selectPostsData = createSelector(
    selectPostsResult,
    (postResult) => postResult.data //the normalized state object with ids and entities
);

// Get selectors creates this selectors for us and we rename them using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
    // We need to tell the adapter from which slice we need to get these selectors
    // Since we are outside the createSlice method
} = postAdapter.getSelectors((state) => selectPostsData(state) ?? initialState);
