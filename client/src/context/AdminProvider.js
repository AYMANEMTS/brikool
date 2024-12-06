import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [jobs, setJobs] = useState([])
    const [categories, setCategories] = useState([])
    const isAuthorized = (user, permission) => {
        if (user?.role === 'moderator') {
            return user.permissions?.includes(permission) || false;
        }
        return true;
    };

    const value = {
        users,setUsers,jobs,setJobs,categories,setCategories,isAuthorized
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





















