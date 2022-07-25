import "./ReactionButtons.css";
import { useAddReactionMutation } from "../PostsSlice";

import React from "react";

const reactionEmojis = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
};

const ReactionButtons = ({ post }) => {
    const [addReaction] = useAddReactionMutation();

    const reactionButtons = Object.entries(reactionEmojis).map(
        ([name, emoji]) => {
            return (
                <button
                    className="reaction-btn"
                    key={name}
                    type="button"
                    onClick={() => {
                        const newValue = post.reactions[name] + 1;
                        addReaction({
                            postId: post.id,
                            reactions: { ...post.reactions, [name]: newValue },
                        });
                    }}
                >
                    {emoji} : {post.reactions[name]}
                </button>
            );
        }
    );

    return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
