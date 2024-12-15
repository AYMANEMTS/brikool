import React from "react";
import {Button, Card, CardBody, Dialog, Input, Typography} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import AuthApi from "../../api/AuthApi";
import {useSnackbar} from "notistack";
import {useSearchParams} from "react-router-dom";

function ResetPasswordForm({open,handleOpen,token}) {
    const {register,watch,handleSubmit,formState:{errors,isValid,isSubmitting}} = useForm({mode:"onChange"})
    const newPassword = watch('newPassword');
    const { t: tValidation } = useTranslation('validation');
    const { t } = useTranslation('settings');
    const { enqueueSnackbar } = useSnackbar();
    const [setSearchParams] = useSearchParams();
    const resetPassword = async (data) => {
        try {
            await AuthApi.resetPassword(data,token)
            handleOpen()
            enqueueSnackbar("Password reset successfully! Login to our account.", { variant: "success" });
        }catch (e) {
            handleOpen()
            enqueueSnackbar("Failed to reset password", { variant: "error" });
            console.log(e)
        }finally {
            setSearchParams({})
        }
    }
    return (
        <>
            <Dialog open={open} handler={handleOpen} size={"sm"}>
                <Card className=" p-6">
                    <CardBody>
                        <div className="text-center mb-6">
                            <Typography variant="h4" color="teal">
                                Reset Your Password
                            </Typography>
                            <Typography variant="small" color="gray">
                                Enter your new password below.
                            </Typography>
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <Input {...register("newPassword",{
                                required: tValidation('requiredField'),
                                minLength: {
                                    value: 7,
                                    message: tValidation('minLength', { field: t('new_password'), min: 7, max: 40 })
                                },
                                maxLength: {
                                    value: 40,
                                    message: tValidation('maxLength', { field: t('new_password'), min: 7, max: 40 })
                                }
                            })}
                                type="password" label="New Password" required className="w-full"
                                   error={errors.newPassword}
                            />
                            {errors.newPassword && <Typography variant={"small"} color={"red"}>{errors.newPassword.message}</Typography>}

                        </div>

                        {/* Confirm Password Input */}
                        <div className="mb-6">
                            <Input {...register('confirmPassword',{
                                required: tValidation('requiredField'),
                                validate: value =>
                                    value === newPassword || t('password_not_match')
                            })}
                               type="password" label="Confirm Password" required className="w-full"
                               error={errors.confirmPassword}
                            />
                            {errors.confirmPassword && <Typography variant={"small"} color={"red"}>{errors.confirmPassword.message}</Typography>}
                        </div>

                        {/* Submit Button */}
                        <Button disabled={!isValid ||isSubmitting} fullWidth className="mt-2" onClick={handleSubmit(resetPassword)}>
                            Reset Password
                        </Button>
                    </CardBody>
                </Card>
            </Dialog>
        </>
    );
}

export default ResetPasswordForm;

