import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.jsx";
import Create from "./routes/Create.jsx";
import Post from "./routes/Post.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "create",
                element: <Create />,
            },
            {
                path: "posts",
                children: [
                    {
                        path: "",
                        element: <Home />,
                    },
                    {
                        path: ":id",
                        element: <Post />,
                    },
                ],
            },
        ],
    },
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
