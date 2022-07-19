import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/PostsSlice";
import usersReducer from "../features/users/UsersSlice";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer,
    },
});

export default store;
