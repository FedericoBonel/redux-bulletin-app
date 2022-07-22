import "./PostsList.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import {
    // Selectors
    selectPostIds,
    selectPostsStatus,
    selectPostsError,
} from "../PostsSlice";

import PostExcerpt from "../PostExcerpt/PostExcerpt";

const PostsList = () => {
    const orderedPostsIds = useSelector(selectPostIds);
    const postsStatus = useSelector(selectPostsStatus);
    const postsError = useSelector(selectPostsError);

    // Check if we have succeeded at fetching all posts and display them
    let list;
    if (postsStatus === "loading") {
        list = <FontAwesomeIcon icon={faCircleNotch} spin={true} size="3x" />;
    } else if (postsStatus === "succeeded") {
        list = orderedPostsIds.map((postId) => (
            <PostExcerpt key={postId} postId={postId} />
        ));
    } else if (postsStatus === "failed") {
        list = <p>Error: {postsError}</p>;
    }

    return <section className="post-list">{list}</section>;
};

export default PostsList;
