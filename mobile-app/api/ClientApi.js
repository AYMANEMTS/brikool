import {axiosClient} from "./axios";

const ClientApi = {
    getWorkers: async () => await axiosClient.get('/jobs'),
    getWorker: async (id) => await axiosClient.get(`/jobs/${id}`),
    getCategories: async () => await axiosClient.get("/categories"),
    login: async (data) => await axiosClient.post('/login',data),
    logout: async () => await axiosClient.post('/logout'),
    register: async (data) => await axiosClient.post('/register',data),
    checkAuth: async () => await axiosClient.get('/check-auth'),
    addComment: async (id,data) => await axiosClient.post(`/jobs/${id}/add-comment`,data),
    addRating: async (id,data) => await axiosClient.post(`/jobs/${id}/add-rating`,data),
    updateInformation: async (formData) => await axiosClient.put(`/clients`,formData,{headers:{
            'Content-Type': 'multipart/form-data'
        }}),
    changePassword: async (data) => await axiosClient.post(`/changePassword`,data),
    getUserNotifications: async () => await axiosClient.get('/notifications'),
    clearUserNotifications: async () => await axiosClient.delete(`/notifications/clear-all`),
    markAsReadNotification: async (notificationsIds) => await axiosClient.post(`/notifications/all-read`, {notificationsIds}),
    markAsReceivedNotification: async (notificationsIds) => await axiosClient.post(`/notifications/all-received`, {notificationsIds}),
    getUnreceivedNotifications: async () => await axiosClient.get('/notifications/unreceived'),
    registerPushToken: async (token,userId) => axiosClient.post('/register-push-token', {token, userId})



}
export default ClientApi

