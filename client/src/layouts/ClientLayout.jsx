import React, {useEffect, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../utils/ScrollToTop";
import ClientSpeedDial from "../components/ClientSpeedDial";
import ClientApi from "../api/ClientApi";
import {useLoading} from "../context/LoadingProvider";
import RequiredCity from "../components/auth/RequiredCity";
import {useQuery} from "react-query";
import {useClientContext} from "../context/ClientProvider";
import Spinner from "../utils/Spinner";
import ServerNotRespond from "../utils/ServerNotRespond";


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
    const {setWorkers,setCategories,setUserJobs} = useClientContext()

    const { data: categories = [], isFetching: isFetchingCategory, isError: isErrorCategory } = useQuery('categories', ClientApi.getCategories, {
        onSuccess: (data) => {
            setCategories(data.data.category);
        },
        onError: err => console.error(err),
        retry: false,
        refetchOnWindowFocus: false,
    });

    const { data: workers = [], isFetching: isFetchingWorkers, isError: isErrorWorkers } = useQuery("jobs", ClientApi.getJobs, {
        onSuccess: (data) => {
            setWorkers(data.data);
        },
        onError: err => console.error(err),
        retry: false,
        refetchOnWindowFocus: false,
    });

    const { data: userJobs = [], isFetching: isFetchingUserJobs, isError: isErrorUserJobs } = useQuery("userJobs", ClientApi.getUserJobs, {
        onSuccess: (data) => {
            setUserJobs(data.data);
        },
        onError: err => console.error(err),
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!user

    });

    const isLoading = isFetchingCategory || isFetchingWorkers || isFetchingUserJobs;
    const isError = isErrorCategory || isErrorWorkers || isErrorUserJobs;
    if (isError){
        return <ServerNotRespond />
    }
    if (isLoading){
        return <Spinner open={isLoading} />
    }
    return (
        <>
            <div className={`flex flex-col min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 `}>
                <ScrollToTop />

                {/* Navbar */}
                <Navbar />

                {/* Main Content Area */}
                <main className={`flex-grow w-full h-full py-0 ${pathname !== '/chat' && 'md:mt-32'}`}>
                    <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 max-w-6xl h-full">
                        <Outlet />
                    </div>
                </main>

                {/* Footer */}
                {pathname === "/chat" ? null : (
                    <Footer  />
                )}

                {requiredCity && (
                    <RequiredCity
                        handleOpen={() => setRequiredCity(!requiredCity)}
                        open={requiredCity}
                    />
                )}
            </div>
            <ClientSpeedDial />
        </>

    );
}


export default ClientLayout;
