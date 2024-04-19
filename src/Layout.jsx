import {Link, Outlet} from "react-router-dom";
import "./App.css"

const Layout = () => {
    return (
        <>
            <Link to="/">
                <h1 className="logo">TypedInk</h1>
            </Link>
            <Outlet/>
        </>
    )
}

export default Layout