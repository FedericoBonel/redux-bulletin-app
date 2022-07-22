import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { selectUserById } from "../UsersSlice";
import { selectPostsByUser } from "../../posts/PostsSlice";

const UserPage = () => {

    const { userId } = useParams();
    const user = useSelector(state => selectUserById(state, Number(userId)));
    const posts = useSelector(state => selectPostsByUser(state, Number(userId)));

    const renderedPosts = posts.map((post) => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ));

    return (
        <section>
            <h2>{user?.name}</h2>
            <ol>
                {renderedPosts}
            </ol>
        </section>
    );
};

export default UserPage;
