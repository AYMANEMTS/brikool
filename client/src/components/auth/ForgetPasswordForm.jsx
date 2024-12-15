import React, { useState } from 'react';
import { Alert, Button, Card, CardBody, Input, Typography } from "@material-tailwind/react";
import AuthApi from "../../api/AuthApi";
import { useForm } from "react-hook-form";

function ForgetPasswordForm() {
    const [successMessage, setSuccessMessage] = useState(null);
    const { register,reset, setError, handleSubmit, formState: { isValid, errors,isSubmitting } } = useForm({
        mode: "onChange",
    });

    const resetPassword = async (data) => {
        try {
            const res = await AuthApi.forgetPassword({ email: data.email });
            if (res.data.redirect) {
                window.location.href = `http://localhost:8000/${res.data.url}`;
            } else if (res.data.success) {
                setSuccessMessage("A reset password link has been sent to your email.");
                reset()
            }
        } catch (e) {
            setError('email', {
                type: 'manual',
                message: "We can't find a user with that email address.",
            });
            console.log(e);
        }
    };
    return (
        <>
            <Card className="w-full p-4 md:p-8">
                <CardBody>
                    <div className="text-center py-5 bg-teal-blue text-white rounded-md">
                        <Typography variant="h4">Reset Your Password</Typography>
                        <Typography variant="small" className="mx-4">
                            Enter your email and we'll send you a link to reset your password.
                        </Typography>
                    </div>

                    {/* Success Alert */}
                    {successMessage && (
                        <Alert color="green" className="mt-2">
                            {successMessage}
                        </Alert>
                    )}

                    {/* Email Input */}
                    <div className={"mt-7"}>
                        <Input
                            label="Email"
                            type="email"
                            {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Please enter a valid email address",
                                },
                            })}
                            error={!!errors.email}
                        />
                        {errors.email && (
                            <Typography variant="small" color="red">
                                {errors.email.message}
                            </Typography>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button disabled={!isValid || isSubmitting} className="mt-5" fullWidth
                        onClick={handleSubmit(resetPassword)}>
                        Reset
                    </Button>
                </CardBody>
            </Card>
        </>
    );
}

export default ForgetPasswordForm;
