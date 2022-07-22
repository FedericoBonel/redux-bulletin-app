import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../../api/Users";

// Hashtable keys are the users id for constant time lookup
const initialState = {};

export const getUsers = createAsyncThunk("users/getUsers", getAllUsers);

const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            const usersHashTable = {};
            action.payload.map((user) => (usersHashTable[user.id] = user));
            // Replace completly the current users slice state by returning it
            return usersHashTable;
        });
    },
});

export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, userId) => state.users[Number(userId)];

export default usersSlice.reducer;
