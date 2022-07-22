import "./UserList.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "../UsersSlice";

const UserList = () => {
    const users = useSelector(selectAllUsers);

    const renderedUsers = Object.entries(users).map((user) => (
        <li key={user[0]}>
            <Link to={`/user/${user[1].id}`}>{user[1].name}</Link>
        </li>
    ));

    return (
        <section className="user-container">
            <div className="user-content-container">
                <h2 className="user-content-container-title">Users</h2>
                <hr />
                {renderedUsers}
            </div>
        </section>
    );
};

export default UserList;
