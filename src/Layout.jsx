import { Outlet } from "react-router-dom";
import "./App.css"

const Layout = () => {
    return (
        <>
            <h1>TypedInk</h1>
            <Outlet/>
        </>
    )
}

export default Layout