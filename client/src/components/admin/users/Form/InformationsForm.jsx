import React, {useEffect, useState} from 'react';
import { Controller,useForm } from "react-hook-form";
import { TextField } from '@mui/material';
import {useQueryClient} from "react-query";

function InformationsForm({control,errors}) {
    const queryClient = useQueryClient();
    const cashedUsers = queryClient.getQueryData('users')
    const [users, setUsers] = useState([])
    useEffect(() => {
        if (cashedUsers && cashedUsers.data) {
            setUsers(cashedUsers.data);
        }
    }, [cashedUsers]);
    return (
        <div className='py-2'>
            <div className={"mb-2"}>
                <Controller name="name" control={control}
                            rules={{
                                required: "Name is required",
                                minLength: {
                                    value: 8,
                                    message: "Name must be at least 8 characters long",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Name cannot exceed 20 characters",
                                },

                            }}
                            render={({field}) => (
                                <TextField {...field} label="Full-Name" fullWidth type={"text"}
                                           variant="outlined" error={!!errors.name}
                                           helperText={errors.name ? errors.name.message : 'required'}
                                />
                            )}
                />
            </div>
            <div className={"mb-2"}>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                        },
                        validate: (value) => {
                            const emailExists = users.some((user) => user.email === value);
                            if (emailExists) return "This email is already in use";
                            return true;
                        },
                    }}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Email"
                            fullWidth
                            type="text"
                            variant="outlined"
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : "required"}
                        />
                    )}
                />

            </div>
            <div className={"mb-2"}>
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long",
                        },
                    }}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Password"
                            fullWidth
                            type="password"
                            variant="outlined"
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : "required"}
                        />
                    )}
                />
            </div>
            <div className={"mb-2"}>
                <Controller
                    name="passwordConfirm"
                    control={control}
                    rules={{
                        required: "Password confirmation is required",
                        validate: (value) =>
                            value === control._formValues.password || "Passwords do not match",
                    }}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Password Confirmation"
                            fullWidth
                            type="password"
                            variant="outlined"
                            error={!!errors.passwordConfirm}
                            helperText={errors.passwordConfirm ? errors.passwordConfirm.message : "required"}
                        />
                    )}
                />
            </div>

        </div>
    );
}

export default InformationsForm;