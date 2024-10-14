import React,{ useEffect, useState } from 'react';
import ClientApi from '../api/ClientApi';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "./UserProvider";

const Protected = ({ children }) => {
    const {setIsLoading} = useAuth()
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    useEffect(() => {
        const checkAuth = async () => {
            try {
                setIsLoading(true)
                const res = await ClientApi.checkAuth(); // Ensure this is correct
                setUser(res.data.user)
            } catch (error) {
                console.error("Authentication check failed:", error);
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth().catch(e => console.log(e))
    }, []);
    if (!user) return null;

    return <>{React.cloneElement(children, { user })}</>;
};

export default Protected;
