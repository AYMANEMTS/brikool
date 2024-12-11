import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import AuthModal from "./auth/AuthModal";
import UserMenu from "./navbarParts/UserMenu";
import Trudiction from "./navbarParts/Trudiction";
import Search from "./navbarParts/Search";
import Notification from "./navbarParts/Notification"
import {useLoading} from "../context/LoadingProvider";
import {useTranslation} from "react-i18next";
import MobileDrawer from "./navbarParts/MobileDrawer";
import SearchMobile from "./navbarParts/SearchMobile";
import DarkMode from "./navbarParts/DarkMode";
import { Button, IconButton } from "@material-tailwind/react";
import {LogInIcon,Menu,LayoutDashboard,Megaphone } from "lucide-react";

export default function Navbar() {
    const [isAtTop, setIsAtTop] = useState(true);
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)
    const {isAuthenticated,user} = useLoading()
    const [swapSate, setSwapSate] = useState(false)
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
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const {t} = useTranslation('navbar')
    const [mobileDrawer, setMobileDrawer] = useState(false)
    const toggleMobileDrawer = () => setMobileDrawer(!mobileDrawer)
    return (
        <>
            <header className={`fixed top-0 left-0 right-0 border-b bg-white dark:bg-gray-900 font-sans min-h-[60px] px-2 md:px-10 py-3 z-50 transition-colors duration-300 border-gray-200 dark:border-gray-700`}>
                <div className=" flex flex-wrap items-center max-lg:gap-y-6 max-sm:gap-x-1">
                    {/* Logo */}
                    <a href="/">
                        <img
                            src="/logo_sm.png"
                            alt="logo"
                            className="w-auto h-10 lg:hidden flex"
                        />
                        <img
                            src="/logo_lg.png"
                            alt="logo"
                            className="w-auto h-10 hidden lg:flex "
                        />
                    </a>


                    {/* Search Input for Mobile */}
                    <SearchMobile/>

                    {/* Navigation Links */}
                    <div
                        id="collapseMenu"
                        className="hidden lg:!flex lg:items-center max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
                    >
                        <ul className="lg:flex lg:gap-x-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2 max-lg:space-y-3 max-lg:fixed max-lg:bg-white dark:max-lg:bg-gray-900 max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                            <li>
                                <Link to="/" className={`${
                                        pathname === "/" ? "active text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                                    } nav-link p-1 hover:text-blue-600 dark:hover:text-blue-400 font-medium`}
                                >
                                    {t("home")}
                                </Link>

                            </li>
                            <li>
                                <Link to="/workers"
                                    className={`${
                                        pathname === "/workers" ? "active text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                                    } nav-link p-1 hover:text-blue-600 dark:hover:text-blue-400 font-medium`}
                                >
                                    {t("workers")}
                                </Link>
                            </li>
                            <li>
                                <Link to="/about-us"
                                    className={`${
                                        pathname === "/about-us" ? "active text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                                    } nav-link p-1 hover:text-blue-600 dark:hover:text-blue-400 font-medium`}
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
                                <div className="hidden md:flex items-center space-x-4">
                                    {user.role === "client" ? (
                                        <Button variant="outlined" size="sm"
                                            onClick={() => navigate("/announces?showForm=true")}
                                            className="dark:bg-gray-800 dark:text-white bg-white text-black rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                        >
                                            <Megaphone />
                                            {t("createNewJob")}
                                        </Button>

                                    ) : (
                                        <Button variant="solid" size="md"
                                            className="dark:bg-gray-800 dark:text-white bg-white text-black rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                            onClick={() => navigate("/admin")}
                                        >
                                            <LayoutDashboard />
                                            {t("dashboard")}
                                        </Button>
                                    )}
                                    <UserMenu />
                                    <Notification />
                                    <DarkMode />
                                    <Trudiction />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="hidden md:flex items-center space-x-4">
                                    <Button variant="outlined" size={"sm"}
                                        className="dark:bg-gray-800 dark:text-white bg-white text-black rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                        onClick={() => {
                                            setSwapSate(true);
                                            handleOpen();
                                        }}
                                    >
                                        {t("createNewJob")}
                                        <Megaphone/>
                                    </Button>
                                    <Button variant="outlined" size="sm"
                                        className="dark:bg-gray-800 dark:text-white bg-white text-black rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                        onClick={() => {
                                            setSwapSate(false);
                                            handleOpen();
                                        }}
                                    >
                                        {t("signIn")}
                                        <LogInIcon />
                                    </Button>
                                    <DarkMode />
                                    <Trudiction />
                                </div>
                            </>
                        )}
                    </div>


                    {/* Mobile Buttons */}
                    <div className="lg:hidden flex space-x-2">
                        {isAuthenticated ? (
                            <>
                                <Notification />
                                <UserMenu />
                            </>
                        ) : (
                            <IconButton variant={"outlined"} size={"sm"}
                                onClick={() => {
                                    setSwapSate(false);
                                    handleOpen();
                                }}
                            >
                                <LogInIcon />
                            </IconButton>
                        )}
                        <IconButton variant={"outlined"} size={"sm"} onClick={toggleMobileDrawer}>
                            <Menu />
                        </IconButton>
                    </div>
                </div>
                <Search isAtTop={isAtTop} />
                <AuthModal open={open} handleOpen={handleOpen} swapState={swapSate} />
                <MobileDrawer toggleDrawer={toggleMobileDrawer} open={mobileDrawer} />
            </header>
        </>
    );
};
