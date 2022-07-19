import "./styles.css";
import { useDispatch } from "react-redux/es/exports";

import { addReaction } from "../PostsSlice";

import React from "react";

const reactionEmojis = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
};

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmojis).map(
        ([name, emoji]) => {
            return (
                <button
                    className="reaction-btn"
                    key={name}
                    type="button"
                    onClick={() =>
                        dispatch(
                            addReaction({ postId: post.id, reaction: name })
                        )
                    }
                >
                    {emoji} : {post.reactions[name]}
                </button>
            );
        }
    );

    return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
