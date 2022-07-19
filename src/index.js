import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import store from "./app/store";
import { getUsers } from "./features/users/UsersSlice";

store.dispatch(getUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    // </React.StrictMode>
);
