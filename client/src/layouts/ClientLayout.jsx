import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../utils/ScrollToTop";
import {useAuth} from "../context/UserProvider";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function ClientLayout() {
    const {pathname} = useLocation()
    const {isLoading= false} = useAuth()
    return (
        <div className={`flex flex-col min-h-screen ${pathname !== '/chat' && 'mt-36'} `}>
            <ScrollToTop />
            {/* Navbar */}
            <Navbar />
            {/* Main Content Area */}
            <main className="flex-grow w-full h-full">
                <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 max-w-screen-xl h-full">
                    <Outlet />
                    {1+1===2 && (
                        <Backdrop
                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                            open={isLoading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    )}
                </div>
            </main>


            {/* Footer */}
            {pathname === '/chat' ? '' : <Footer/>}
        </div>
    );
}


export default ClientLayout;