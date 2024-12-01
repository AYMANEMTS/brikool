import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Home from "../pages/clients/Home";
import Workers from "../pages/clients/Workers";
import AboutUs from "../pages/clients/AboutUs";
import WorkerDetails from "../pages/clients/WorkerDetails";
import Settings from "../pages/clients/Settings";
import Chat from "../pages/clients/Chat";
import Announces from "../pages/clients/Announces";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/admin/HomePage";
import AdminLogin from "../pages/admin/AdminLogin";
import Users from "../pages/admin/Users";
import Jobs from "../pages/admin/Jobs";
import Category from "../pages/admin/Category";

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
    {
        element: <AdminLayout />,
        children: [
            { path: '/admin', element: <HomePage /> },
            { path: '/admin/users', element: <Users /> },
            { path: '/admin/jobs', element: <Jobs /> },
            { path: '/admin/category', element: <Category /> },
        ]
    },
    { path: 'admin/login', element: <AdminLogin /> }

]);
