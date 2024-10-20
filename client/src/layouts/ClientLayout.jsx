import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../utils/ScrollToTop";
import ClientSpeedDial from "../components/ClientSpeedDial";


function ClientLayout() {
    const {pathname} = useLocation()
    return (
        <>
            <div className={`flex flex-col min-h-screen mt-20 ${pathname !== '/chat' && 'md:mt-36'} `}>
                <ScrollToTop/>
                {/* Navbar */}
                <Navbar/>
                {/* Main Content Area */}
                <main className="flex-grow w-full h-full">
                    <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 max-w-screen-xl h-full">
                        <Outlet/>
                    </div>
                </main>
                {/* Footer */}
                {pathname === '/chat' ? '' : <Footer/>}
            </div>
            <ClientSpeedDial />
        </>
    );
}


export default ClientLayout;