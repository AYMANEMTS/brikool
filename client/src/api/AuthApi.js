import {axiosClient} from "./axios";

const AuthApi= {
    register: async (data) => await axiosClient.post("/register",data),
    login: async (data) => await axiosClient.post("/login",data),
    logout: async () => await axiosClient.post("/logout"),
    checkAuth: async () => await axiosClient.get("/check-auth"),
    forgetPassword: async (data) => await axiosClient.post("/forget-password",data),
}
export default AuthApi