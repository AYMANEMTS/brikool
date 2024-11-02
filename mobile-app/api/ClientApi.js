import {axiosClient} from "./axios";

const ClientApi = {
    getWorkers: async () => await axiosClient.get('/jobs'),
    getWorker: async (id) => await axiosClient.get(`/jobs/${id}`),
    getCategories: async () => await axiosClient.get("/categories"),
    login: async (data) => await axiosClient.post('/login',data),
    register: async (data) => await axiosClient.post('/register',data),
    checkAuth: async () => await axiosClient.get('/check-auth'),
    addComment: async (id,data) => await axiosClient.post(`/jobs/${id}/add-comment`,data),
    addRating: async (id,data) => await axiosClient.post(`/jobs/${id}/add-rating`,data),
    updateInformation: async (formData) => await axiosClient.put(`/clients`,formData,{headers:{
            'Content-Type': 'multipart/form-data'
        }}),
    changePassword: async (data) => await axiosClient.post(`/changePassword`,data),



}
export default ClientApi

