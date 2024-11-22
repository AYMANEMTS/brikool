import React, { useState, useEffect } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import AuthModal from "./auth/AuthModal";
import UserMenu from "./navbarParts/UserMenu";
import Trudiction from "./navbarParts/Trudiction";
import Search from "./navbarParts/Search";
import CampaignIcon from "@mui/icons-material/Campaign";
import PersonIcon from "@mui/icons-material/Person";
import Notification from "./navbarParts/Notification"
import {useLoading} from "../context/LoadingProvider";

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
    return (
        <>
            <header className={`fixed top-0 left-0 right-0 border-b bg-white font-sans min-h-[60px] px-10 py-3 z-50 `}>
                <div className='flex flex-wrap items-center max-lg:gap-y-6 max-sm:gap-x-4'>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="">
                        <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36'/>
                    </a>
                    <div id="collapseMenu"
                         className="max-lg:hidden lg:!flex lg:items-center max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50">


                        <ul className='lg:flex lg:gap-x-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
                            <li>
                                <Link to={"/"} className={`${pathname === "/" && 'active'} nav-link p-1 hover:text-blue-500 hover:font-bold`}>Home</Link>
                            </li>
                            <li>
                                <Link to={"/workers"} className={`${pathname === '/workers' && 'active'} nav-link p-1 hover:text-blue-500 hover:font-bold`}>Workers</Link>
                            </li>
                            <li>
                                <Link to={"/about-us"} className={`${pathname === '/about-us' && 'active'} nav-link p-1 hover:text-blue-500 hover:font-bold`}>About US</Link>
                            </li>
                        </ul>
                    </div>

                    <div className='flex items-center ml-auto space-x-8'>
                        {isAuthenticated && user ? (
                            <>
                                {/* Icons on the right */}
                                <div className="md:flex space-x-4 hidden">
                                    <button onClick={() => navigate("/announces?showForm=true")}
                                            className="flex items-center space-x-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                        <span>Create New Job</span>
                                        <CampaignIcon fontSize="small"/>
                                    </button>
                                    <UserMenu/>
                                    <Notification />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="md:flex space-x-4 hidden">
                                    <Trudiction/>
                                    <button onClick={() => {
                                        setSwapSate(true)
                                        handleOpen()
                                    }}
                                            className="flex items-center space-x-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                        <span>Create New Job</span>
                                        <CampaignIcon fontSize="small"/>
                                    </button>
                                    <button onClick={() => {
                                        setSwapSate(false)
                                        handleOpen()
                                    }}
                                            className="flex items-center space-x-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                        <span>Sign in</span>
                                        <PersonIcon fontSize="small"/>
                                    </button>
                                </div>
                            </>
                        )}
                        <button id="toggleOpen" className='lg:hidden'>
                            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* search */}
                <Search isAtTop={isAtTop}/>
            </header>
            <AuthModal open={open} handleOpen={handleOpen} swapState={swapSate}/>
        </>

    );
};
