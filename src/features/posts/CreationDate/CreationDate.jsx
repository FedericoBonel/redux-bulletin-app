import "./CreationDate.css";
import { parseISO, formatDistanceToNow } from "date-fns";

const CreationDate = ({ timestamp }) => {
    let timeAgo = "";

    if (timestamp) {
        let dateObject = parseISO(timestamp);
        timeAgo = `${formatDistanceToNow(dateObject)} ago`;
    }

    return (
        <span className="time-ago">
            {timeAgo ? timeAgo : "timestamp not available"}
        </span>
    );
};

export default CreationDate;
