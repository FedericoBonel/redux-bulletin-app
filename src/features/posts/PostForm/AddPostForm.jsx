import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./styles.css";

import { addPost } from "../PostsSlice";
import { selectAllUsers } from "../../users/UsersSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();

    // Form states
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState(null);

    // Users coming from global state
    const users = useSelector(selectAllUsers);

    // Checks if all fields have been selected
    const canSaveUser = Boolean(title) && Boolean(userId) && Boolean(content);

    // Dispatches a creation action to the global state
    const onCreatePost = () => {
        dispatch(addPost(title, content, userId));

        setTitle("");
        setContent("");
    };

    // Creates the JSX to display the users as options
    const renderUserOptions = Object.keys(users).map((userId) => (
        <option key={users[userId].id} value={users[userId].id}>
            {users[userId].name}
        </option>
    ));

    return (
        <section className="post-form-container">
            <h2>Add new Post!</h2>
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
                        <option disabled selected value>
                            -- select an option --
                        </option>
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
                    onClick={onCreatePost}
                    disabled={!canSaveUser}
                >
                    Create Post
                </button>
            </form>
        </section>
    );
};

export default AddPostForm;
