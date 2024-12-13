import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthModal from "./auth/AuthModal";
import UserMenu from "./navbarParts/UserMenu";
import Trudiction from "./navbarParts/Trudiction";
import Search from "./navbarParts/Search";
import Notification from "./navbarParts/Notification";
import { useLoading } from "../context/LoadingProvider";
import { useTranslation } from "react-i18next";
import MobileDrawer from "./navbarParts/MobileDrawer";
import SearchMobile from "./navbarParts/SearchMobile";
import DarkMode from "./navbarParts/DarkMode";
import {Button, IconButton, useTheme} from "@material-tailwind/react";
import { LogInIcon, Menu, LayoutDashboard, Megaphone } from "lucide-react";

export default function Navbar() {
    const [isAtTop, setIsAtTop] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const { isAuthenticated, user } = useLoading();
    const [swapSate, setSwapSate] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { t } = useTranslation('navbar');
    const [mobileDrawer, setMobileDrawer] = useState(false);
    const toggleMobileDrawer = () => setMobileDrawer(!mobileDrawer);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsAtTop(true);
            } else {
                setIsAtTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 border-b-2 border-teal-blue bg-white dark:bg-gray-900 font-sans min-h-[60px] px-2 md:px-10 py-3 z-50 transition-colors duration-300  dark:border-bright-yellow`}>
                <div className="flex flex-wrap items-center max-lg:gap-y-6 max-sm:gap-x-1 justify-between w-full">
                    {/* Logo */}
                    <a href="/">
                        <img
                            src="/logo_sm.png"
                            alt="logo"
                            className="w-auto h-10 lg:hidden md:hidden flex"
                        />
                        <img
                            src="/logo_lg.png"
                            alt="logo"
                            className="w-auto h-10 hidden md:flex lg:flex  "
                        />
                    </a>

                    {/* Search Input for Mobile */}
                    <SearchMobile className="lg:hidden"/>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex lg:items-center lg:gap-x-10 ml-10">
                        <ul className="flex gap-x-10">
                            <li>
                                <Link
                                    to="/"
                                    className={`${
                                        pathname === "/" ? "active text-teal-blue dark:text-yellow-400" : "text-gray-700 dark:text-gray-300"
                                    } nav-link p-1 hover:text-teal-blue dark:hover:text-yellow-400 font-medium`}
                                >
                                    {t("home")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/workers"
                                    className={`${
                                        pathname === "/workers" ? "active text-teal-blue dark:text-yellow-400" : "text-gray-700 dark:text-gray-300"
                                    } nav-link p-1 hover:text-teal-blue dark:hover:text-yellow-400 font-medium`}
                                >
                                    {t("workers")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about-us"
                                    className={`${
                                        pathname === "/about-us" ? "active text-teal-blue dark:text-yellow-400" : "text-gray-700 dark:text-gray-300"
                                    } nav-link p-1 hover:text-teal-blue dark:hover:text-yellow-400 font-medium`}
                                >
                                    {t("about")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center ml-auto pr-2 space-x-6">
                        {isAuthenticated ? (
                            <>
                                <div className="hidden md:flex items-center space-x-2">
                                    {user.role === "client" ? (
                                        <Button onClick={() => navigate("/announces?showForm=true")} className="p-1 ml-2 flex items-center gap-2 ">
                                            <Megaphone/>
                                            {t("createNewJob")}
                                        </Button>
                                    ) : (
                                        <Button className="p-1 flex items-center gap-2" onClick={() => navigate("/admin")}>
                                            <LayoutDashboard/>
                                            {t("dashboard")}
                                        </Button>
                                    )}
                                    <UserMenu/>
                                    <Notification/>
                                    <DarkMode/>
                                    <Trudiction/>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="hidden md:flex items-center space-x-2">
                                    <Button className="p-1 ml-2 flex items-center gap-2"
                                        onClick={() => {
                                            setSwapSate(true);
                                            handleOpen();
                                        }}>
                                        {t("createNewJob")}
                                        <Megaphone />
                                    </Button>

                                    <Button className="p-1 flex items-center gap-2 " onClick={() => {
                                                setSwapSate(false);
                                                handleOpen();
                                            }}>
                                        <span className={"lg:hidden"}>{t("signIn")}</span>
                                        <LogInIcon/>
                                    </Button>
                                    <DarkMode/>
                                    <Trudiction/>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile Buttons */}
                    <div className="lg:hidden md:hidden flex space-x-2">
                        {isAuthenticated ? (
                            <>
                                <Notification/>
                                <UserMenu/>
                            </>
                        ) : (
                            <IconButton onClick={() => {
                                            setSwapSate(false);
                                            handleOpen();
                                        }} >
                                <LogInIcon/>
                            </IconButton>
                        )}
                    </div>
                    <div className={"lg:hidden mx-1 "}>
                        <IconButton onClick={toggleMobileDrawer}>
                            <Menu className={"w-6 h-6 text-xl dark:text-black"}/>
                        </IconButton>
                    </div>
                </div>
                <Search isAtTop={isAtTop}/>
                <AuthModal open={open} handleOpen={handleOpen} swapState={swapSate}/>
                <MobileDrawer toggleDrawer={toggleMobileDrawer} open={mobileDrawer}/>
            </header>
        </>
    );
};
