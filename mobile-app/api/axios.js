import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const axiosClient = axios.create({
    baseURL: 'http://192.168.1.103:8000',
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosClient.interceptors.request.use(async (config) => {
    const jwt = await AsyncStorage.getItem('jwt');
    if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
}, (error) => Promise.reject(error));
