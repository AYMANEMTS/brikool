import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ClientApi from "../api/ClientApi";

const StateUserContext = createContext({
    user: null,
    login: () => {},
    register: () => {},
    logout: () => {}
})


export default function UserContext({children}){
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const token = await AsyncStorage.getItem('jwt');
            if (token) {
                const response = await ClientApi.checkAuth();
                if (response && response.data.user) setUser(response.data.user);
            }
        };
        loadUser();
    }, []);

    const login = async (data) => {
        const response = await ClientApi.login(data);
        if (response.data && response.data.jwt) {
            await AsyncStorage.setItem('jwt', response.data.jwt);
            setUser(response.data.user);
        }
        return response;
    };
    const register = async (data) => {
        const response = await ClientApi.register(data);
        if (response.data && response.data.jwt) {
            await AsyncStorage.setItem('jwt', response.data.jwt);
            setUser(response.data.user);
        }
        return response;
    };

    const logout = async () => {
        // await ClientApi.();
        await AsyncStorage.removeItem('jwt');
        setUser(null);
    };
    return (
        <StateUserContext.Provider value={{
            user, login, logout, register
        }}>
            {children}
        </StateUserContext.Provider>
    )
}
export const useUserContext = () => useContext(StateUserContext)
