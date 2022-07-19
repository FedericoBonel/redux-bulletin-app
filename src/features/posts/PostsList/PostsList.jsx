import "./styles.css";
import { useSelector } from "react-redux";

import { selectAllPosts } from "../PostsSlice";

import PostAuthor from "../PostAuthor/PostAuthor";
import CreationDate from "../CreationDate/CreationDate";
import ReactionButtons from "../ReactionButtons/ReactionButtons";

const PostsList = () => {
    const posts = useSelector(selectAllPosts);

    const postsByDate = posts
        .slice()
        .sort((post1, post2) => post2.date.localeCompare(post1.date));

    return (
        <section className="post-list">
            <h2>Posts</h2>
            {postsByDate.map((post) => (
                <article key={post.id} className="post-card">
                    <h3>{post.title}</h3>
                    <p>{post.content.substring(0, 150)}</p>
                    <p>
                        <PostAuthor userId={post.userId} />{" "}
                        <i>
                            <CreationDate timestamp={post.date} />
                        </i>
                    </p>
                    <ReactionButtons post={post}/>
                </article>
            ))}
        </section>
    );
};

export default PostsList;
