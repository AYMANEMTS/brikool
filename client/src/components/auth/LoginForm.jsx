import React, { useState} from 'react';
import ClientApi from "../../api/ClientApi";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {Loader} from "lucide-react";
import {useLoading} from "../../context/LoadingProvider";
import {useTranslation} from "react-i18next";
import {Button, Typography, Input, Alert, Card, CardBody,} from "@material-tailwind/react";

function LoginForm({handllSwapForm,handleOpen,redirectRoute}) {
    const { enqueueSnackbar } = useSnackbar();
    const {register,handleSubmit,setError,formState:{errors,
    isValid}} = useForm()
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)
    const {setUser, setIsAuthenticated,user} = useLoading()
    const [loading, setLoading] = useState(false)
    const {t} = useTranslation('login')

    const handlLogin = async (data) => {
        setMessage(null)
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('email',data.email)
            formData.append('password',data.password)
            const res = await ClientApi.login(formData);
            if (res.status === 200) {
                setIsAuthenticated(true)
                setUser(res?.data?.user)
                handleOpen();
                if (res?.data?.user?.role === 'admin' || res?.data?.user?.role === 'moderator'){
                    navigate("/admin")
                    enqueueSnackbar(t("successMessage"),{variant: 'success'})
                    return;
                }
                navigate(redirectRoute)
                enqueueSnackbar(t("successMessage"),{variant: 'success'})
            }
        } catch (error) {
            if (!error.response) {
                // Network or server is down
                setMessage('Server is currently unavailable. Please try again later.');
            } else {
                const { message, errors: serverErrors } = error.response.data;
                console.log(serverErrors)
                if (message) setMessage(message);
                if (serverErrors && Array.isArray(serverErrors)) {
                    serverErrors.forEach((errorItem) => {
                        const { field, message } = errorItem;
                        setError(field, {
                            type: 'manual',
                            message: message,
                        });
                    });
                }
            }
            console.error('AdminLogin failed:', error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <Card className="w-full  p-4 md:p-8">
            <CardBody>
                <Typography variant="h4" className="text-center mb-4">
                    {t('loginTitle')}
                </Typography>

                {message !== null && (
                    <Alert color="red" className="mb-4">
                        {message}
                    </Alert>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handlLogin)}>
                    <div>
                        <Input
                            {...register('email', {
                                required: { value: true, message: "Email field is required" },
                            })}
                            label={t('email')}
                            type="email"
                            error={errors.email}
                            required
                        />
                        {errors.email && (
                            <Typography variant="small" color="red">
                                {errors.email.message}
                            </Typography>
                        )}
                    </div>

                    <div>
                        <Input
                            {...register('password', {
                                required: { value: true, message: "Password field is required" },
                            })}
                            label={t('password')}
                            type="password"
                            error={errors.password}
                            required
                        />
                        {errors.password && (
                            <Typography variant="small" color="red">
                                {errors.password.message}
                            </Typography>
                        )}
                    </div>

                    <Button type="submit" color="blue" size="sm"  className="mt-4" disabled={!isValid}>
                        {loading ? (
                            <Loader className="animate-spin mx-auto text-white" />
                        ) : (
                            t('signIn')
                        )}
                    </Button>

                    <Button color="blue-gray" size="sm" variant="outlined" className="flex items-center justify-center space-x-2"
                            onClick={() => (window.location.href = 'http://localhost:8000/auth/google')}>
                        <svg className={"h-4 w-4"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                        </svg>
                        <span className={"ml-2"}>{t('signInWithGoogle')}</span>
                    </Button>
                </form>

                <div className="flex justify-between mt-4">
                    <span
                        onClick={handllSwapForm}
                        className="text-blue-500 cursor-pointer hover:underline"
                    >
                        {t('register')}
                    </span>
                    <span
                        className="text-blue-500 cursor-pointer hover:underline"
                    >
                        {t('forgotPassword')}
                    </span>
                </div>
            </CardBody>
        </Card>
    );
}

export default LoginForm;
