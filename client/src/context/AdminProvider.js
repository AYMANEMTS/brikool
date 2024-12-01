import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [jobs, setJobs] = useState([])
    const [categories, setCategories] = useState([])
    const value = {
        users,setUsers,jobs,setJobs,categories,setCategories
    };
    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => {
    return useContext(AdminContext);
};





















