import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sub from "date-fns/sub";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
    posts: [],
    status: "idle", // idle | failed | succeeded | loading
    error: null,
};

// Get all posts from backend server asynchrounously (in another thread)
export const getPosts = createAsyncThunk("posts/getPosts", async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
});

// Create new posts in the backend server asynchrounously (in another thread)
export const createPost = createAsyncThunk(
    "posts/createPost",
    async (newPost) => {
        const response = await axios.post(POSTS_URL, newPost);
        return response.data;
    }
);

// Update posts in the backend server asynchrounously (in another thread)
export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (updatedPost) => {
        const response = await axios.put(
            `${POSTS_URL}/${updatedPost.id}`,
            updatedPost
        );
        return response.data;
    }
);

// Delete posts in the backend server asynchrounously (in another thread)
export const deletePost = createAsyncThunk("posts/deletePost", async (post) => {
    const postId = post.id;
    const response = await axios.delete(`${POSTS_URL}/${postId}`);
    if (response.status === 200) return post;
    return `${response.status}:${response.statusText}`;
});

const postsSlice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {
        addReaction: (state, action) => {
            const { postId, reaction } = action.payload;
            const foundPost = state.posts.find((post) => post.id === postId);

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
                state.posts = state.posts.concat(loadedPosts);
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
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                // This could happen if the server has an error for example (i.g 5XX response code)
                if (!action.payload?.id) {
                    console.log("Problem saving updated post");
                    console.log(action.payload);
                    return;
                }
                const { id } = action.payload;
                action.payload.userId = Number(action.payload.userId);
                // ! Adding handmade dates this should be removed when an actual microservice is developed
                action.payload.date = new Date().toISOString();
                // ! End of removable code
                state.posts = state.posts.filter((post) => post.id !== id);
                state.posts.push(action.payload);
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("Problem saving updated post");
                    console.log(action.payload);
                    return;
                }
                const { id } = action.payload;
                state.posts = state.posts.filter((post) => post.id !== id);
            });
    },
});

// Exports the posts selector (in the global state), that way if in the future the location in
// the state tree changes, we only need to change it here
export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectPostById = (state, postId) =>
    state.posts.posts.find((post) => post.id === postId);

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
