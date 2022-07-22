import "./PostPage.css";

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
            <section className="not-found">
                <h2>404 - The requested post does not exist! 😿</h2>
            </section>
        );
    }

    return (
        <article className="post-container">
            <div className="post-content">
                <h2 className="post-title">{post.title}</h2>
                <hr />
                <p>{post.body}</p>
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <p>
                    <PostAuthor userId={post.userId} />{" "}
                    <i>
                        <CreationDate timestamp={post.date} />
                    </i>
                </p>
                <ReactionButtons post={post} />
            </div>
        </article>
    );
};

export default PostPage;
