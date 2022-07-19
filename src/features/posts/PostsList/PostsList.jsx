import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import {
    // Selectors
    selectAllPosts,
    selectPostsStatus,
    selectPostsError,
    // Get Posts action to update store
    getPosts,
} from "../PostsSlice";

import PostExcerpt from "../PostExcerpt/PostExcerpt";

const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(selectPostsStatus);
    const postsError = useSelector(selectPostsError);

    // If the post slice is in it's default state
    // Fetch all posts from the server
    useEffect(() => {
        if (postsStatus === "idle") {
            dispatch(getPosts());
        }
    }, [postsStatus, dispatch]);

    // Check if we have succeeded at fetching all posts and display them
    let list;
    if (postsStatus === "loading") {
        list = <FontAwesomeIcon icon={faCircleNotch} spin={true} size="3x" />;
    } else if (postsStatus === "succeeded") {
        const postsByDate = posts
            .slice()
            .sort((p1, p2) => p2.date.localeCompare(p1.date));
        list = postsByDate.map((post) => (
            <PostExcerpt key={post.id} post={post} />
        ));
    } else if (postsStatus === "failed") {
        list = <p>Error: {postsError}</p>;
    }

    return (
        <section className="post-list">
            <h2>Posts</h2>
            {list}
        </section>
    );
};

export default PostsList;
