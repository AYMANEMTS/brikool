import React, { useState } from "react";
import {Outlet, useNavigate, Link, useLocation} from "react-router-dom";
import {useLoading} from "../../context/LoadingProvider";
import {useAdminContext} from "../../context/AdminProvider";
import Trudiction from "../navbarParts/Trudiction";
import {ChartBarStacked } from 'lucide-react';
import AuthApi from "../../api/AuthApi";

function AdminUi() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const logout = async () => {
        try {
            await AuthApi.logout()
            window.location.href = '/'
        }catch (e) {
            console.log(e)
        }
    }
    const { pathname} = useLocation()
    const {user} = useLoading()
    const {isAuthorized} = useAdminContext()

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white z-20 transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 md:translate-x-0`} >
                <div className="p-4 text-center font-bold text-lg border-b border-blue-800">
                    Admin Dashboard
                </div>
                <nav className="flex-1 p-4 space-y-4">
                    <Link to="/admin" className={`${pathname === '/admin' && 'bg-blue-700 text-white'} flex items-center p-2 space-x-2 rounded hover:bg-blue-700 hover:text-white transition`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                            className="w-5 h-5  group-hover:text-white transition">
                            <path fill={'#ffffff'} d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                        </svg>
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>

                    <button onClick={() => navigate("/admin/users")} disabled={!isAuthorized(user,'view_users')}
                        className={`${pathname === '/admin/users' && 'bg-blue-700 text-white'} flex items-center p-2 space-x-2 rounded hover:bg-blue-700 hover:text-white transition w-full ${!isAuthorized(user,'view_users') && 'cursor-not-allowed'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5  group-hover:text-white transition">
                            <path fill="#ffffff" d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 160 0 0-256L64 160zm384 0l-160 0 0 256 160 0 0-256z"/>
                        </svg>
                        <span className="text-sm font-medium">Users</span>
                    </button>

                    <Link to="/admin/jobs" className={`${pathname === '/admin/jobs' && 'bg-blue-700 text-white'} flex items-center p-2 space-x-2 rounded hover:bg-blue-700 hover:text-white transition`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5  group-hover:text-white transition">
                            <path fill="#ffffff" d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-128z"/>
                        </svg>
                        <span className="text-sm font-medium">Jobs</span>
                    </Link>

                    <Link to="/admin/category" className={`${pathname === '/admin/category' && 'bg-blue-700 text-white'} flex items-center p-2 space-x-2 rounded hover:bg-blue-700 hover:text-white transition`}>
                        <ChartBarStacked />
                        <span className="text-sm font-medium">Category</span>
                    </Link>



                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col ml-0 md:ml-64">
                {/* Navbar */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    {/* Sidebar Toggle Button */}
                    <div className="flex items-center space-x-4">
                        <button
                            className="p-2 rounded bg-blue-600 text-white hover:bg-blue-500 md:hidden"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen ? "Close" : "Menu"}
                        </button>
                        {/* Logo */}
                        <img
                            src="/logo512.png"
                            alt="Admin Logo"
                            className="h-8 w-auto"
                        />
                    </div>

                    <h1 className="text-xl font-semibold capitalize hidden md:block">
                        Welcome {user?.name || ""}
                    </h1>

                    <div className="flex items-center space-x-4">
                        <Trudiction />
                        <button onClick={logout} className="p-2 rounded bg-gray-200 hover:bg-gray-300">
                            Logout
                        </button>
                    </div>
                </header>

                {/* Overlay for mobile sidebar */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                {/* Content Area */}
                <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminUi;
