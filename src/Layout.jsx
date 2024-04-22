import {Link, Outlet} from "react-router-dom";
import "./App.css"

const Layout = () => {
    return (
        <>
            <Link className="logoWrapper" to="/">
                <h1 className="logoWrapper__logo">TypedInk</h1>
            </Link>
            <Outlet/>
        </>
    )
}

export default Layout