import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useLoading} from "../../context/LoadingProvider";
import {enqueueSnackbar} from "notistack";
import AdminApi from "../../api/AdminApi";
import Alert from "@mui/material/Alert";
import {Button, TextField} from "@mui/material";
import {Loader} from "lucide-react";
import {useNavigate} from "react-router-dom";

function AdminLogin() {
    const {register,handleSubmit,setError,formState:{errors,
        isValid}} = useForm()
    const [message, setMessage] = useState(null)
    const {setUser, setIsAuthenticated} = useLoading()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleLogin = async (data) => {
        setMessage(null)
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('email',data.email)
            formData.append('password',data.password)
            const res = await AdminApi.login(formData);
            if (res.status === 200) {
                setIsAuthenticated(true)
                setUser(res.data.user)
                localStorage.setItem('isLogin','true')
                enqueueSnackbar('Welcome Back :)',{variant: 'success'})
                navigate("/admin")
            }
        } catch (error) {
            if (!error.response) {
                setMessage('Server is currently unavailable. Please try again later.');
            } else {
                const { message, errors: serverErrors } = error.response.data;
                if (message) setMessage(message);
                if (serverErrors && Array.isArray(serverErrors)) {
                    serverErrors.forEach((errorItem) => {
                        const { path, msg } = errorItem;
                        setError(path, {
                            type: 'manual',
                            message: msg,
                        });
                    });
                }
            }
            console.error('AdminLogin failed:', error);
        } finally {
            setLoading(false)
        }
    }
    const isLogin = localStorage.getItem('isLogin')

    useEffect(() => {
        if (isLogin) navigate("/admin")
    }, [isLogin]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-800">
            <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                {message !== null && (
                    <Alert className={"mb-4"} variant="filled" severity="error">
                        {message}
                    </Alert>
                )}
                <form onSubmit={handleLogin} className="space-y-4 ">
                    {/* Email Input */}
                    <div>
                        <TextField {...register('email',{
                            required: {value:true,message:"Email field is required"}
                        })}
                                   label="Email"
                                   type="email"
                                   fullWidth
                                   variant="outlined" error={errors.email}
                                   required helperText={errors.email && errors.email.message}

                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <TextField {...register('password',{
                            required: {value:true,message:"Password field is required"}
                        })}
                                   label="Password"
                                   type="password"
                                   fullWidth
                                   variant="outlined" error={errors.password}
                                   required helperText={errors.password && errors.password.message}
                        />
                    </div>

                    {/* Login Button */}
                    <Button onClick={handleSubmit(handleLogin)}
                            type="submit" disabled={!isValid}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2, mb: 1 }}
                    >
                        {loading ? <><Loader className={" mx-2 animate-spin text-white"} /> loading</> : "Sign In"}
                    </Button>
                </form>

            </div>
        </div>
    );
}

export default AdminLogin;
