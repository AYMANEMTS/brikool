import {axiosClient} from "./axios";

const ClientApi = {
    getWorkers: async () => await axiosClient.get('/jobs'),
    getCategories: async () => await axiosClient.get("/categories"),
    login: async (data) => await axiosClient.post('/login',data),
    register: async (data) => await axiosClient.post('/register',data),
    checkAuth: async () => await axiosClient.get('/check-auth'),
}
export default ClientApi

