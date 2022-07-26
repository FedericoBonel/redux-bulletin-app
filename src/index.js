import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import store from "./app/store";
import { usersApiSlice } from "./features/users/UsersSlice";
import { postsApiSlice } from "./features/posts/PostsSlice";

import { BrowserRouter, Routes, Route } from "react-router-dom";

store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
store.dispatch(postsApiSlice.endpoints.getPosts.initiate());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                {/* We are mapping all paths to the main react 
                App that way we can re route inside of it */}
                <Route path="/*" element={<App />} />
            </Routes>
        </BrowserRouter>
    </Provider>
    // </React.StrictMode>
);
