import "./PostAuthor.css";
import { useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";

import { selectAllUsers } from "../../users/UsersSlice";

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers);

    const author = users[userId];

    return (
        <span className="author-name">
            by:{" "}
            {author ? (
                <Link to={`/user/${author.id}`}>{author.name}</Link>
            ) : (
                "Anonymous author"
            )}
        </span>
    );
};

export default PostAuthor;
