import "./UserList.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers, useCreateUserMutation } from "../UsersSlice";

const UserList = () => {
    const [createUser, { isLoading }] = useCreateUserMutation();
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const users = useSelector(selectAllUsers);

    const canAddUser =
        Boolean(name) && Boolean(username) && Boolean(email) && !isLoading;

    const onAddUser = async () => {
        if (canAddUser) {
            try {
                await createUser({ name, username, email }).unwrap();

                setName("");
                setUsername("");
                setEmail("");
                setShowForm(false);
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    const renderedUsers = Object.entries(users).map((user) => (
        <li key={user[0]}>
            <Link to={`/user/${user[1].id}`}>{user[1].name}</Link>
        </li>
    ));

    const addUserForm = (
        <div className="user-form-container">
            <form className="user-form slide-in-blurred-top">
                <div className="user-form-control">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="user-form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="user-form-control">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="user-form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="user-form-control">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        className="user-form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={onAddUser}
                    disabled={!canAddUser}
                >
                    Add User
                </button>
            </form>
        </div>
    );

    return (
        <section className="user-container">
            <div className="user-content-container">
                <div className="user-content-container-title">
                    <h2 className="user-content-container-title">Users</h2>
                    <button onClick={() => setShowForm(!showForm)}>New</button>
                </div>
                {showForm ? addUserForm : <></>}
                <hr />
                {renderedUsers}
            </div>
        </section>
    );
};

export default UserList;
