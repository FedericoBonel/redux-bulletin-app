import { createSlice } from "@reduxjs/toolkit";

// Hashtable keys are the users id for constant lookup
const initialState = {
    "1": { id: "1", name: "Federico Jorge Bonel Tozzi" },
    "2": { id: "2", name: "Giuseppe Giuliano Bonel Tozzi" },
    "3": { id: "3", name: "Belen Angelica" },
};

const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
    },
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
