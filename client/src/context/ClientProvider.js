import React, {createContext, useContext, useState} from 'react';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
    const [workers, setWorkers] = useState([])
    const [categories, setCategories] = useState([])
    const [userJobs, setUserJobs] = useState([])

    const value = {
        workers, setWorkers, categories, setCategories, userJobs, setUserJobs
    };
    return (
        <ClientContext.Provider value={value}>
            {children}
        </ClientContext.Provider>
    );
};

export const useClientContext = () => {
    return useContext(ClientContext);
};





















