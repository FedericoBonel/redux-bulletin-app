import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

// Gets the users
export const getAllUsers = async () => {
    const response = await axios.get(USERS_URL);
    return response.data;
};
