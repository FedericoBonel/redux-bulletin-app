import "./EditPostForm.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deletePost, updatePost, selectPostById } from "../PostsSlice";
import { useParams, useNavigate } from "react-router-dom";

import { selectAllUsers } from "../../users/UsersSlice";

const EditPostForm = () => {
    const dispatch = useDispatch();

    const { postId } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    const [requestStatus, setRequestStatus] = useState("idle");

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    // Checks if all fields have been selected and there is no current request leaving the client
    const canSavePost =
        Boolean(title) &&
        Boolean(userId) &&
        Boolean(content) &&
        requestStatus === "idle";

    // Dispatches a creation action to the global state
    const onEditPost = () => {
        if (canSavePost) {
            try {
                setRequestStatus("pending");
                dispatch(
                    updatePost({
                        id: post.id,
                        title,
                        body: content,
                        userId,
                        reactions: post.reactions,
                    })
                ).unwrap();

                setTitle("");
                setContent("");
                setUserId("");
                navigate(`/post/${postId}`);
            } catch (error) {
                console.log(error.message);
            } finally {
                setRequestStatus("idle");
            }
        }
    };

    const onDeletePost = () => {
        try {
            setRequestStatus("pending");
            dispatch(deletePost(post)).unwrap();

            setTitle("");
            setContent("");
            setUserId("");
            navigate("/");
        } catch (error) {
            console.log(error.message);
        } finally {
            setRequestStatus("idle");
        }
    };

    const renderUserOptions = Object.keys(users).map((userId) => (
        <option key={users[userId].id} value={users[userId].id}>
            {users[userId].name}
        </option>
    ));

    return (
        <section className="post-form-container">
            <h2>Edit Post</h2>
            <form className="post-form">
                <div className="post-form-control">
                    <label htmlFor="postTitle">Post Title:</label>
                    <input
                        className="post-form-input"
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="post-form-control">
                    <label htmlFor="postUserId">Post Author:</label>
                    <select
                        className="post-form-input"
                        id="postUserId"
                        name="postUserId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    >
                        <option>-- Select your user --</option>
                        {renderUserOptions}
                    </select>
                </div>
                <div className="post-form-control">
                    <label htmlFor="postContent">Post Content:</label>
                    <textarea
                        className="post-form-input"
                        id="postContent"
                        name="postContent"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="post-form-submit-btn"
                    onClick={onEditPost}
                    disabled={!canSavePost}
                >
                    Save
                </button>
                <button
                    type="button"
                    className="post-form-submit-btn"
                    onClick={onDeletePost}
                >
                    Delete
                </button>
            </form>
        </section>
    );
};

export default EditPostForm;
