import "./PostAuthor.css";
import { useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";

import { selectUserById } from "../../users/UsersSlice";

const PostAuthor = ({ userId }) => {
    const author = useSelector((state) => selectUserById(state, userId));

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
