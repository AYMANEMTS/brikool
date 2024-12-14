import React, { useState } from 'react';
import citiesInMorocco from "../../utils/citiesInMorocco";
import { useForm, Controller } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {Loader} from "lucide-react";
import {useLoading} from "../../context/LoadingProvider";
import {useTranslation} from "react-i18next";
import {Card,CardBody,Typography,Alert,Input,Button,Select,Option } from "@material-tailwind/react";
import AuthApi from "../../api/AuthApi";

function RegisterForm({ handllSwapForm,handleOpen, redirectRoute }) {
    const { register, handleSubmit, control,setError, formState: { errors,isValid } } = useForm();
    const navigate = useNavigate()
    const {setUser, setIsAuthenticated} = useLoading()
    const [message, setMessage] = useState(null)
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false)
    const {t,i18n} = useTranslation('register');
    const {language:lng} = i18n
    const handleRegister = async (data) => {
        setMessage(null)
        setLoading(true)
        try {
            const res = await AuthApi.register(data);
            setIsAuthenticated(true)
            setUser(res.data.user)
            handleOpen()
            navigate(redirectRoute)
            enqueueSnackbar(t('successMessage'),{variant:"success"})
        } catch (error) {
            if (!error.response) {
                // Network or server is down
                setMessage('Server is currently unavailable. Please try again later.');
            } else {
                const { message, errors: serverErrors } = error.response.data;
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
            console.error('Register failed:', error);
        } finally {
            setLoading(false)
        }
    };
    return (
        <Card className={"w-full"}>
            <CardBody>
                <Typography variant="h5" className={"text-center mb-4"}>
                    {t('createAccount')}
                </Typography>
                {message !== null && (
                    <Alert variant="filled" severity="error" color={"red"} className={"mb-4"}>
                        {message}
                    </Alert>
                )}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleRegister)}>
                    <div>
                        <Input label={t('fullName')} type="text"
                               {...register('name', {
                                   required: {value: true, message: "Full-name field is required "}
                               })}
                               error={errors.name}
                        />
                        {errors.name &&
                            <Typography variant="small" color="red">
                                {errors.name.message}
                            </Typography>
                        }
                    </div>

                    <div>
                        <Input label={t('email')} type="email"
                               {...register('email', {
                                   required: {value: true, message: "email field is required "}
                               })}
                               error={errors.email}
                        />
                        {errors.email &&
                            <Typography variant="small" color="red">
                                {errors.email.message}
                            </Typography>
                        }
                    </div>

                    <div>
                        <Input label={t('password')} type="password"
                               {...register('password', {
                                   required: {value: true, message: "Password field is required "}
                               })}
                               error={errors.password}
                        />
                        {errors.password &&
                            <Typography variant="small" color="red">
                                {errors.password.message}
                            </Typography>
                        }
                    </div>

                    <div>
                        <Controller
                            name="city"
                            control={control}
                            rules={{required: 'City is required'}}
                            render={({field}) => (
                                <Select label={"Select City"}{...field} error={errors.city}
                                    value={field.value?.[lng] || ""}
                                    onChange={(val) => {
                                        const selectedCity = citiesInMorocco.find(
                                            (city) => city[lng] === val
                                        );
                                        field.onChange(selectedCity || {ar: "", fr: "", en: ""});
                                    }}
                                >
                                    {citiesInMorocco.map((city, key) => (
                                        <Option key={key} value={city[lng]}>
                                            {city[lng]}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.city && (
                            <Typography variant="small" color="red">
                                {errors.city.message}
                            </Typography>
                        )}
                    </div>


                    <Button type="submit" color="blue" size="sm" className="mt-4" disabled={!isValid}>
                        {loading ? (
                            <Loader className="animate-spin mx-auto text-white"/>
                        ) : (
                            t('register')
                        )}
                    </Button>
                    <Button color="blue-gray" size="sm" variant="outlined" className="flex items-center justify-center bg-gray-500 text-white hover:bg-gray-800 hover:text-white space-x-2"
                            onClick={() => (window.location.href = 'http://localhost:8000/auth/google')}>
                        <svg className={"h-4 w-4 fill-white"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                        </svg>
                        <span className={"ml-2"}>{t('registerWithGoogle')}</span>
                    </Button>
                </form>
                <div className="flex justify-center mt-4">
                    <span onClick={handllSwapForm} className="text-blue-500 cursor-pointer hover:underline">
                        {t('alreadyHaveAccount')}
                    </span>
                </div>
            </CardBody>
        </Card>
    );
}

export default RegisterForm;
