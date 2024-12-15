import {axiosClient} from "./axios";

const AuthApi= {
    register: async (data) => await axiosClient.post("/register",data),
    login: async (data) => await axiosClient.post("/login",data),
    logout: async () => await axiosClient.post("/logout"),
    checkAuth: async () => await axiosClient.get("/check-auth"),
    forgetPassword: async (data) => await axiosClient.post("/forget-password",data),
    resetPassword: async (data,token) => await axiosClient.post(`/reset-password/${token}`,data),
    verifyEmail: async (data) => await axiosClient.post(`/verify-email/`,data),
    verifyUserEmail: async () => await axiosClient.get('/send-verification-token')
}
export default AuthApi