import {
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import sub from "date-fns/sub";

import {
    getAllPosts,
    createNewPost,
    updateSavedPost,
    deleteSavedPost,
} from "../../api/Posts";

// Creates the postSlice adapter for selectors and normalized state auto creation (sorting ids by date)
const postAdapter = createEntityAdapter({
    sortComparer: (post1, post2) => post2.date.localeCompare(post1.date),
});

const initialState = postAdapter.getInitialState({
    status: "idle", // idle | failed | succeeded | loading
    error: null,
});

// Get all posts from backend server asynchrounously (in another thread)
export const getPosts = createAsyncThunk("posts/getPosts", getAllPosts);

// Create new posts in the backend server asynchrounously (in another thread)
export const createPost = createAsyncThunk("posts/createPost", (newPost) =>
    createNewPost(newPost)
);

// Update posts in the backend server asynchrounously (in another thread)
export const updatePost = createAsyncThunk("posts/updatePost", (updatedPost) =>
    updateSavedPost(updatedPost)
);

// Delete posts in the backend server asynchrounously (in another thread)
export const deletePost = createAsyncThunk("posts/deletePost", (post) =>
    deleteSavedPost(post)
);

const postsSlice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {
        addReaction: (state, action) => {
            const { postId, reaction } = action.payload;
            const foundPost = state.entities[postId];

            if (foundPost) {
                foundPost.reactions[reaction]++;
            }
        },
    },
    // Adding extra cases that are outside our defined reducers for the thunk (async get posts)
    // Each ones of these ones are going to use the promises states since those are specific actions for the action
    // posts/getPosts (generated in createAsyncThunk)
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                let min = 1;
                const loadedPosts = action.payload.map((post) => {
                    // ! Adding handmade dates and
                    // ! reactions this should be removed when an actual microservice is developed
                    post.date = sub(new Date(), {
                        minutes: min++,
                    }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    };
                    // ! End of removable code
                    return post;
                });
                postAdapter.upsertMany(state, loadedPosts);
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId);
                // ! Adding handmade dates and
                // ! reactions this should be removed when an actual microservice is developed
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0,
                };
                // ! End of removable code
                postAdapter.addOne(state, action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                // This could happen if the server has an error for example (i.g 5XX response code)
                if (!action.payload?.id) {
                    console.log("Problem saving updated post");
                    console.log(action.payload);
                    return;
                }
                action.payload.userId = Number(action.payload.userId);
                // ! Adding handmade dates this should be removed when an actual microservice is developed
                action.payload.date = new Date().toISOString();
                // ! End of removable code
                postAdapter.upsertOne(state, action.payload);
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("Problem saving updated post");
                    console.log(action.payload);
                    return;
                }
                postAdapter.removeOne(state, action.payload.id);
            });
    },
});

// Get selectors creates this selectors for us and we rename them using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
    // We need to tell the adapter from which slice we need to get these selectors
    // Since we are outside the createSlice method
} = postAdapter.getSelectors((state) => state.posts);

export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const { addReaction } = postsSlice.actions;

export default postsSlice.reducer;
