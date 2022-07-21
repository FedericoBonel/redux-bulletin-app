import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import store from "./app/store";
import { getUsers } from "./features/users/UsersSlice";
import { getPosts } from "./features/posts/PostsSlice";

import { BrowserRouter, Routes, Route } from "react-router-dom";

store.dispatch(getUsers());
store.dispatch(getPosts());

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
