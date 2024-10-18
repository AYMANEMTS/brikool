import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    const value = {
        isLoading,
        startLoading,
        stopLoading,
    };
    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    return useContext(LoadingContext);
};





















