import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux/es/exports";
import { selectUserById } from "../UsersSlice";
import { useGetPostsByUserIdQuery } from "../../posts/PostsSlice";

const UserPage = () => {
    const { userId } = useParams();
    const user = useSelector((state) => selectUserById(state, Number(userId)));

    const {
        data: normalizedPostsState,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useGetPostsByUserIdQuery(userId);

    let renderedPosts;
    if (isLoading) {
        renderedPosts = <FontAwesomeIcon icon={faCircleNotch} spin size="3x" />;
    } else if (isSuccess) {
        const { ids, entities } = normalizedPostsState;
        renderedPosts = ids.map((postId) => (
            <li key={postId}>
                <Link to={`/post/${postId}`}>{entities[postId].title}</Link>
            </li>
        ));
    } else if (isError) {
        renderedPosts = <p>{error}</p>;
    } else {
        renderedPosts = <p>An unknown state has happened in RTK Query</p>;
    }

    return (
        <section className="user-container">
            <div className="user-content-container">
                <h2 className="user-content-container-title">
                    {user?.name}'s Posts
                </h2>
                {renderedPosts}
            </div>
        </section>
    );
};

export default UserPage;
