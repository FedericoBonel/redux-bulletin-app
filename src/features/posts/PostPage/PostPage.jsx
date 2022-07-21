import { useSelector } from "react-redux";
import { selectPostById } from "../PostsSlice";

import { useParams, Link } from "react-router-dom";

import PostAuthor from "../PostAuthor/PostAuthor";
import ReactionButtons from "../ReactionButtons/ReactionButtons";
import CreationDate from "../CreationDate/CreationDate";

const PostPage = () => {
    // Get post id from the path parameter (i.g. url.com/post/{postId})
    const params = useParams();
    const postId = Number(params.postId);

    const post = useSelector((state) => selectPostById(state, postId));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <article>
            <h1>{post.title}</h1>
            <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
            <p>{post.body}</p>
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

export default PostPage;
