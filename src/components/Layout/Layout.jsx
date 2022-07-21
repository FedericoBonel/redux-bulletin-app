import "./Layout.css";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

// This component works as the App parent of all components
// Whatever is in here will get displayed in every single route and path
// Good to have if we were to add headers and footers
const Layout = () => {
    return (
        <>
            <Header />
            <main className="App">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
