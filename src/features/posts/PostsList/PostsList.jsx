import "./PostsList.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import { selectPostIds, useGetPostsQuery } from "../PostsSlice";

import PostExcerpt from "../PostExcerpt/PostExcerpt";

const PostsList = () => {
    // Get the current posts fetching states, whenever this finishes, it means we have access to the ids
    const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

    const orderedPostsIds = useSelector(selectPostIds);

    // Check if we have succeeded at fetching all posts and display them
    let list;
    if (isLoading) {
        list = <FontAwesomeIcon icon={faCircleNotch} spin size="3x" />;
    } else if (isSuccess) {
        list = orderedPostsIds.map((postId) => (
            <PostExcerpt key={postId} postId={postId} />
        ));
    } else if (isError) {
        list = <p>Error: {error}</p>;
    } else {
        list = <p>Unknown fetching state in postSlice.postApiSlice</p>;
    }

    return <section className="post-list">{list}</section>;
};

export default PostsList;
