import React, {useState} from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import ClientApi from "../../api/ClientApi";
import {useForm} from "react-hook-form";
import Alert from '@mui/material/Alert';
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {Loader} from "lucide-react";


function LoginForm({handllSwapForm,handleOpen,redirectRoute}) {
    const { enqueueSnackbar } = useSnackbar();
    const {register,handleSubmit,setError,formState:{errors,
    isValid}} = useForm()
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const handlLogin = async (data) => {
        setMessage(null)
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('email',data.email)
            formData.append('password',data.password)
            const res = await ClientApi.login(formData);
            if (res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                localStorage.setItem('authenticated', 'true'); // Store as string
                handleOpen();
                navigate(redirectRoute)
                enqueueSnackbar('Welcome Back :)',{variant: 'success'})
            }
        } catch (error) {
            if (!error.response) {
                // Network or server is down
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
            console.error('Login failed:', error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                padding: 2,
                '@media (max-width: 600px)': {
                    padding: 1,
                },
            }}
        >
            <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                Login to Your Account
            </Typography>
            {message !== null && (
                <Alert variant="filled" severity="error">
                    {message}
                </Alert>
            )}
            <TextField {...register('email',{
                required: {value:true,message:"Email field is required"}
            })}
                label="Email"
                type="email"
                fullWidth
                variant="outlined" error={errors.email}
                required helperText={errors.email && errors.email.message}

            />
            <TextField {...register('password',{
                required: {value:true,message:"Password field is required"}
            })}
                label="Password"
                type="password"
                fullWidth
                variant="outlined" error={errors.password}
                required helperText={errors.password && errors.password.message}
            />

            <Button onClick={handleSubmit(handlLogin)}
                type="submit" disabled={!isValid}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, mb: 1 }}
            >
                {loading ? <><Loader className={" mx-2 animate-spin text-white"} /> loading</> : "Sign In"}
            </Button>

            <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{ mb: 2 }}
            >
                Sign In with Google
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Link onClick={handllSwapForm} variant="body2" sx={{ textDecoration: 'none' }} className={"cursor-pointer"}>
                    Register
                </Link>
                <Link  variant="body2" sx={{ textDecoration: 'none' }} className={"cursor-pointer"}>
                    Forgot Password?
                </Link>
            </Box>
        </Box>
    );
}

export default LoginForm;
