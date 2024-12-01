import React, {useEffect, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../utils/ScrollToTop";
import ClientSpeedDial from "../components/ClientSpeedDial";
import ClientApi from "../api/ClientApi";
import {useLoading} from "../context/LoadingProvider";
import RequiredCity from "../components/auth/RequiredCity";


function ClientLayout() {
    const {pathname} = useLocation()
    const [requiredCity, setRequiredCity] = useState(false)
    const {setUser, setIsAuthenticated,user} = useLoading()
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await ClientApi.checkAuth();
                if (res.status === 200) {
                    setIsAuthenticated(true)
                    setUser(res.data.user)
                }else {
                    setIsAuthenticated(false)
                    setUser(null)
                }
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                console.error("Authentication check failed:", error);
            }
        };
        checkAuth().catch(e => console.log(e))
    }, []);
    useEffect(() => {
        if (user && user.googleId && !user.city ){
            setRequiredCity(true)
        }else{
            setRequiredCity(false)
        }
    }, [user,pathname,requiredCity]);
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
                { pathname === '/chat' ? '' : <Footer/> }
                { requiredCity && <RequiredCity handleOpen={() => setRequiredCity(!requiredCity)} open={requiredCity} /> }
            </div>
            <ClientSpeedDial />
        </>
    );
}


export default ClientLayout;
