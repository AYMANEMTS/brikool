import {axiosClient} from "./axios";

const ClientApi = {
    register: async (data) => await axiosClient.post("/register",data),
    login: async (data) => await axiosClient.post("/login",data),
    logout: async () => await axiosClient.post("/logout"),
    checkAuth: async () => await axiosClient.get("/check-auth"),
    getCategories: async () => await axiosClient.get("/categories"),
    createJob: async (data) => await axiosClient.post('/jobs',data),
    getJobs: async () => await axiosClient.get('/jobs'),
    getUserJobs: async () => await axiosClient.get(`/clients/jobs/`),
    getJob: async (id) => await axiosClient.get(`/jobs/${id}`),
    addComment: async (id,data) => await axiosClient.post(`/jobs/${id}/add-comment`,data),
    addRating: async (id,data) => await axiosClient.post(`/jobs/${id}/add-rating`,data),
    updateClient: async (data) => await axiosClient.put(`/clients`,data),
    changePassword: async (data) => await axiosClient.post(`/changePassword`,data),
    changeStatus: async (id) => await axiosClient.post(`/jobs/${id}/change-status`),
    updateJob: async (id,data) => await axiosClient.put(`/jobs/${id}`,data),
    deleteJob: async (id) => await axiosClient.delete(`/jobs/${id}`),
    getUserChats: async () => await axiosClient.get(`/chats/chats-user/`),
    getChat: async (userId2) => await axiosClient.get(`/chats/${userId2}`),
    sendMessage: async (chatId, data) => await axiosClient.post(`/chats/${chatId}/messages`, data),
    getUserNotifications: async () => await axiosClient.get(`/notifications`),
    clearUserNotifications: async () => await axiosClient.delete(`/notifications/clear-all`),
    markAsReadNotification: async (notificationsIds) => await axiosClient.post(`/notifications/all-read`, {notificationsIds})

}
export default ClientApi
