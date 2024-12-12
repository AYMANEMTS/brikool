import React, {createContext, useContext, useEffect, useState} from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [darkMode, setDarkMode] = useState(false)
    const toggleDarkMode = () => setDarkMode(!darkMode)
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);
    const value = {
        isLoading,
        startLoading, stopLoading,
        isAuthenticated, setIsAuthenticated,
        user, setUser, toggleDarkMode, darkMode
    };
    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context
};





















