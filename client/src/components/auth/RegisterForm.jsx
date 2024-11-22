import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import citiesInMorocco from "../../utils/citiesInMorocco";
import { useForm, Controller } from "react-hook-form";
import ClientApi from "../../api/ClientApi";
import Alert from "@mui/material/Alert";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {Loader} from "lucide-react";
import {useLoading} from "../../context/LoadingProvider";

function RegisterForm({ handllSwapForm,handleOpen, redirectRoute }) {
    const { register, handleSubmit, control,setError, formState: { errors,isValid } } = useForm();
    const navigate = useNavigate()
    const {setUser, setIsAuthenticated} = useLoading()
    const [message, setMessage] = useState(null)
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false)
    const handleRegister = async (data) => {
        setMessage(null)
        setLoading(true)
        try {
            const res = await ClientApi.register(data);
            setIsAuthenticated(true)
            setUser(res.data.user)
            handleOpen()
            navigate(redirectRoute)
            enqueueSnackbar("You are registered SuccessFully",{variant:"success"})
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
            console.error('Register failed:', error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(handleRegister)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: 400,
                padding: 2,
                margin: 'auto',
                '@media (max-width: 600px)': {
                    padding: 1,
                    width: '90%',
                },
            }}
        >
            <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                Create an Account
            </Typography>
            {message !== null && (
                <Alert variant="filled" severity="error">
                    {message}
                </Alert>
            )}
            <TextField
                label="Full Name"
                type="text"
                fullWidth
                variant="outlined"
                {...register('name', {
                    required: { value: true, message: "Full-name field is required " }
                })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : null}
            />
            <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                {...register('email', {
                    required: { value: true, message: "Email field is required " }
                })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : null}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                {...register('password', {
                    required: { value: true, message: "Password field is required " }
                })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : null}
            />

            {/* City Dropdown with Controller */}
            <FormControl fullWidth error={!!errors.city}>
                <InputLabel id="city-label">City *</InputLabel>
                <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    rules={{ required: { value: true, message: "City field is required" } }}
                    render={({ field }) => (
                        <Select
                            labelId="city-label"
                            label="City *"
                            {...field}
                        >
                            {citiesInMorocco?.map((city, key) => (
                                <MenuItem key={key} value={city}>
                                    {city}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                <FormHelperText>{errors.city ? errors.city.message : null}</FormHelperText>
            </FormControl>

            <Button disabled={!isValid}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, mb: 1 }}
            >
                {loading ? <><Loader className={" mx-2 animate-spin text-white"} /> loading</> : "Register"}
            </Button>

            <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{ mb: 2 }}
            >
                Register with Google
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }} onClick={handllSwapForm} className={"cursor-pointer"}>
                <Link variant="body2" sx={{ textDecoration: 'none' }}>
                    Already have an account? <span className={"pl-1"}>Sign in</span>
                </Link>
            </Box>
        </Box>
    );
}

export default RegisterForm;
