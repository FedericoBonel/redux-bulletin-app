import axios from "axios";

const POSTS_URL = "http://localhost:3500/posts";

// Get posts
export const getAllPosts = async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
}

// Create new post
export const createNewPost = async (newPost) => {
    const response = await axios.post(POSTS_URL, newPost);
    return response.data;
}

// Updates a post
export const updateSavedPost = async (updatedPost) => {
    const response = await axios.put(
        `${POSTS_URL}/${updatedPost.id}`,
        updatedPost
    );
    return response.data;
}

// Deletes an existing post
export const deleteSavedPost = async (post) => {
    const postId = post.id;
    const response = await axios.delete(`${POSTS_URL}/${postId}`);
    if (response.status === 200) return post;
    return `${response.status}:${response.statusText}`;
}

// Gets all posts for the specific user
export const getPostsForUser = async (userId) => {
    const response = await axios.get(`${POSTS_URL}?userId=${userId}`);
    return response.data;
}