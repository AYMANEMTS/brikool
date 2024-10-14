import React, { useState, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import AuthModal from "./auth/AuthModal";
import LoginIcon from '@mui/icons-material/Login';
import {Button} from "@mui/material";
import UserMenu from "./navbarParts/UserMenu";
import Protected from "../context/Protected";
import Trudiction from "./navbarParts/Trudiction";
import DarkMode from "./navbarParts/DarkMode";

export default function Navbar() {
    const [isAtTop, setIsAtTop] = useState(true);
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)
    const {pathname} = useLocation()
    const authenticated = localStorage.getItem('authenticated')
    useEffect(() => {
        // Scroll event listener to check if scroll position is at the top
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsAtTop(true); // User is at the top
            } else {
                setIsAtTop(false); // User scrolled away from the top
            }
        };

        // Attach event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
                        <button id="toggleClose"
                                className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3'>
                            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10 9.586L16.707 3.879a1 1 0 00-1.414-1.414L9.586 8.172 3.879 2.464A1 1 0 002.465 3.878L8.172 9.586 2.464 15.293a1 1 0 001.414 1.414L9.586 10.414l6.707 6.707a1 1 0 001.414-1.414L10 9.586z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </button>

                        <ul className='lg:flex lg:gap-x-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
                            <li>
                                <Link to={"/"} className="hover:text-blue-500">Home</Link>
                            </li>
                            <li>
                                <Link to={"/workers"} className="hover:text-blue-500">Workers</Link>
                            </li>
                            <li>
                                <Link to={"/about-us"} className="hover:text-blue-500">About US</Link>
                            </li>
                        </ul>
                    </div>

                    <div className='flex items-center ml-auto space-x-8'>
                        <button id="toggleOpen" className='lg:hidden'>
                            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </button>

                        {/* Icons on the right */}
                        <div className="flex space-x-4">
                            {/* account  */}
                            {authenticated ? (
                                <Protected><UserMenu /></Protected>
                            ) : (
                                <Button variant="outlined" startIcon={<LoginIcon />} onClick={handleOpen}>
                                    Sign in
                                </Button>
                            )}

                            {/* trudiction */}
                            <Trudiction />

                            {/* dark mode */}
                            <DarkMode />
                        </div>


                    </div>
                </div>

                {isAtTop && pathname !== '/chat' && (
                    <div
                        className="hidden md:flex bg-gray-100 border border-transparent focus-within:border-blue-500 focus-within:bg-transparent  px-6 rounded-full h-10 lg:w-2/4 mt-3 mx-auto max-lg:mt-6"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 192.904 192.904"
                            width="16px"
                            className="fill-gray-600 mr-3 rotate-90"
                        >
                            <path d="M81.229,163.393c-44.294,0-80.44-36.146-80.44-80.44c0-44.294,36.146-80.44,80.44-80.44 c44.294,0,80.44,36.146,80.44,80.44C161.669,127.247,125.523,163.393,81.229,163.393z M81.229,15.998 c-36.048,0-65.436,29.387-65.436,65.436c0,36.048,29.387,65.436,65.436,65.436c36.048,0,65.436-29.387,65.436-65.436 C146.665,45.385,117.277,15.998,81.229,15.998z M97.13,81.229c0-8.199-6.662-14.861-14.861-14.861c-8.199,0-14.861,6.662-14.861,14.861c0,8.199,6.662,14.861,14.861,14.861 C90.468,96.09,97.13,89.428,97.13,81.229z M121.885,111.164c-3.149-3.149-8.224-3.149-11.373,0c-3.149,3.149-3.149,8.224,0,11.373 c3.149,3.149,8.224,3.149,11.373,0C125.034,119.388,125.034,114.313,121.885,111.164z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full outline-none bg-transparent text-gray-600 font-semibold text-[15px]"
                        />
                    </div>
                )}
            </header>
            <AuthModal open={open} handleOpen={handleOpen}  />
        </>

    );
};