import "./PostExcerpt.css";
import PostAuthor from "../PostAuthor/PostAuthor";
import CreationDate from "../CreationDate/CreationDate";
import ReactionButtons from "../ReactionButtons/ReactionButtons";
import { Link } from "react-router-dom";

const PostExcerpt = ({ post }) => {
    return (
        <article className="post-card">
            <h2>
                <Link to={`post/${post.id}`}>{post.title}</Link>
            </h2>
            <p>{post.body.substring(0, 75)}...</p>
            <p>
                <PostAuthor userId={post.userId} />{" "}
                <i>
                    <CreationDate timestamp={post.date} />
                </i>
            </p>
            <ReactionButtons post={post} />
        </article>
    );
};

export default PostExcerpt;
