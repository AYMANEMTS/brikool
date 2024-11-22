// router.js
import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Home from "../pages/clients/Home";
import Workers from "../pages/clients/Workers";
import AboutUs from "../pages/clients/AboutUs";
import WorkerDetails from "../pages/clients/WorkerDetails";
import Settings from "../pages/clients/Settings";
import Chat from "../pages/clients/Chat";
import Announces from "../pages/clients/Announces";
import Protected from "../context/Protected";

export const router = createBrowserRouter([
    {
        element: <ClientLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/workers", element: <Workers /> },
            { path: "/about-us", element: <AboutUs /> },
            { path: "/worker/:id", element: <WorkerDetails /> },
            { path: "/settings", element: <Settings />},
            { path: "/chat", element: <Chat /> },
            { path: "/announces", element: <Announces /> },
        ]
    },

]);
