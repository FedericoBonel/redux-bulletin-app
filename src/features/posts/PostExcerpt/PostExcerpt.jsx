import PostAuthor from "../PostAuthor/PostAuthor";
import CreationDate from "../CreationDate/CreationDate";
import ReactionButtons from "../ReactionButtons/ReactionButtons";

const PostExcerpt = ({ post }) => {
    return (
        <article className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 150)}</p>
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
