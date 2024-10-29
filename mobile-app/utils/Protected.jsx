import React,{ useEffect, useState } from 'react';
import ClientApi from '../api/ClientApi';
import {Text} from "react-native";

const Protected = ({ children }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await ClientApi.checkAuth(); // Ensure this is correct
                setUser(res.data.user)
            } catch (error) {
                console.error("Authentication check failed:", error);
            }
        };
        checkAuth().catch(e => console.log(e))
    }, []);
    if (!user) return <Text>Unauthorized</Text>

    return <>{React.cloneElement(children, { user })}</>;
};

export default Protected;
