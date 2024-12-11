import React, {useEffect, useState} from 'react';
import { Controller } from "react-hook-form";
import {useQueryClient} from "react-query";
import {Typography, Input} from "@material-tailwind/react";

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
                        <Input {...field} label="Full-Name"  type={"text"} required
                                   variant="outlined" error={errors.name}
                        />
                    )}
                />
                {errors.name && <Typography variant={"small"} color={"red"}>{errors.name.message}</Typography>}
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
                        <Input {...field} label="Email" type="text" required
                            variant="outlined" error={errors.email}
                        />
                    )}
                />
                {errors.email && <Typography variant={"small"} color={"red"}>{errors.email.message}</Typography>}

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
                        <Input required {...field}  label="Password"
                            type="password" variant="outlined" error={errors.password}
                        />
                    )}
                />
                {errors.password && <Typography variant={"small"} color={"red"}>{errors.password.message}</Typography>}
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
                        <Input{...field} label="Password Confirmation" type="password"
                            variant="outlined" error={errors.passwordConfirm} required
                        />
                    )}
                />
                {errors.passwordConfirm && <Typography variant={"small"} color={"red"}>{errors.passwordConfirm.message}</Typography>}
            </div>

        </div>
    );
}

export default InformationsForm;