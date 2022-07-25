import axios from "axios";

const USERS_URL = "http://localhost:3500/users";

// Gets the users
export const getAllUsers = async () => {
    const response = await axios.get(USERS_URL);
    return response.data;
};
