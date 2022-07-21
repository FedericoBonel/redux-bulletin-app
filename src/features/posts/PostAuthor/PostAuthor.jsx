import "./PostAuthor.css";
import { useSelector } from "react-redux/es/exports";

import { selectAllUsers } from "../../users/UsersSlice";

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers);

    const author = users[userId];

    return (
        <span className="author-name">
            by: {author ? author.name : "Anonymous author"}
        </span>
    );
};

export default PostAuthor;
