import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import ClientApi from "../../api/ClientApi";
import Alert from "@mui/material/Alert";
import {useSnackbar} from "notistack";
import {Loader} from "lucide-react";

const PasswordUpdateForm = () => {
    const { register, handleSubmit, watch, formState: { errors,isValid } } = useForm({mode:"onChange"});
    const [errorMessage, setErrorMessage] = useState(null)
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false)
    const handleForm = async (data) => {
        try{
            setLoading(true)
            const res = await ClientApi.changePassword(data)
            if(res.status === 200){
                enqueueSnackbar('You password changed successfully',{variant:"success"})
            }
        }catch (e) {
            if (e.response.status === 400 || e.response.data.error){
                setErrorMessage(e.response.data.error)
            }else{
                enqueueSnackbar('Failed to change password',{variant:"error"})
            }
        }finally {
            setLoading(false)
        }
    };

    const newPassword = watch('newPassword');

    return (
        <form onSubmit={handleSubmit(handleForm)} className="my-3">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {errorMessage !== null && (
                        <Alert variant="filled" severity="error">
                            {errorMessage}
                        </Alert>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Current Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        {...register('currentPassword', {
                            required: "Current password is required",
                            minLength: {
                                value: 7,
                                message: "Minimum 7 characters required"
                            },
                            maxLength: {
                                value: 40,
                                message: "Maximum 40 characters allowed"
                            }
                        })}
                        error={!!errors.currentPassword}
                        helperText={errors.currentPassword?.message}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="New Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        {...register('newPassword', {
                            required: "New password is required",
                            minLength: {
                                value: 7,
                                message: "Minimum 7 characters required"
                            },
                            maxLength: {
                                value: 40,
                                message: "Maximum 40 characters allowed"
                            }
                        })}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        {...register('confirmPassword', {
                            required: "Please confirm your password",
                            validate: value =>
                                value === newPassword || "Passwords do not match"
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button disabled={!isValid || loading}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        {loading ? <><Loader className={" mx-2 animate-spin text-white"} /> loading</> : "Update Password"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default PasswordUpdateForm;
