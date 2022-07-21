import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="navbar">
            <h1>Redux Blog</h1>
            <nav>
                <ul>
                    <li>
                        <Link className="navbar-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="btn-grad" to="/post">
                            New
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
