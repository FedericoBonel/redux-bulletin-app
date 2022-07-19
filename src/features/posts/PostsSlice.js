import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
    {
        id: 1,
        title: "Learning Redux",
        content: "I've heard good things of redux, it's awesome!",
        userId: "1",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        },
    },
    {
        id: 2,
        title: "Slices!",
        content: "The more I say slices the more I want pizza",
        userId: "2",
        date: sub(new Date(), { days: 1, minutes: 20 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        },
    },
];

const postsSlice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {
        addPost: {
            // This gets executed when addPost action gets executed
            reducer: (state, action) => {
                state.push(action.payload);
            },
            // This is the callback function for the reducer, basically it defines an user interface
            // for the programmer, that way you can call to add post in your components as: dispatch(addPost(title, content))
            // and that gets mapped to this function before pushing it in the state, that is, the action's payload gets reassigned to this object
            prepare: (title, content, userId) => {
                return {
                    payload: {
                        id: nanoid(),
                        title: title,
                        content: content,
                        date: new Date().toISOString(),
                        userId: userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        },
                    },
                };
            },
        },
        addReaction: (state, action) => {
            const { postId, reaction } = action.payload;
            const foundPost = state.find((post) => post.id === postId);

            if (foundPost) {
                foundPost.reactions[reaction]++;
            }
        },
    },
});

// Exports the posts selector (in the global state), that way if in the future the location in
// the state tree changes, we only need to change it here
export const selectAllPosts = (state) => state.posts;

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
