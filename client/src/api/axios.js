import axios from "axios";

export const axiosClient = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    withCredentials: true
});

