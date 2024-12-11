import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ClientApi from "../../api/ClientApi";
import { useSnackbar } from "notistack";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";
import {Input, Button, Alert, Typography} from "@material-tailwind/react";

const PasswordUpdateForm = () => {
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({ mode: "onChange" });
    const [errorMessage, setErrorMessage] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation('settings');

    const handleForm = async (data) => {
        try {
            setLoading(true);
            const res = await ClientApi.changePassword(data);
            if (res.status === 200) {
                enqueueSnackbar(t('success_change_pass'), { variant: "success" });
            }
        } catch (e) {
            if (e.response.status === 400 || e.response.data.error) {
                setErrorMessage(e.response.data.error);
            } else {
                enqueueSnackbar(t('failed_change_pass'), { variant: "error" });
            }
        } finally {
            setLoading(false);
        }
    };

    const newPassword = watch('newPassword');
    const { t: tValidation } = useTranslation('validation');

    return (
        <form onSubmit={handleSubmit(handleForm)} className="my-3 space-y-6 mx-3">
            {/* Error Alert */}
            {errorMessage !== null && (
                <Alert color="red">
                    {errorMessage}
                </Alert>
            )}

            {/* Current Password */}
            <div>
                <Input label={t("current_password")} type="password" variant="outlined"
                    {...register('currentPassword', {
                        required: tValidation('requiredField'),
                        minLength: {
                            value: 7,
                            message: tValidation('minLength', { field: t("current_password"), min: 7, max: 40 })
                        },
                        maxLength: {
                            value: 40,
                            message: tValidation('maxLength', { field: t("current_password"), min: 7, max: 40 })
                        }
                    })}
                    error={errors.currentPassword}
                />
                {errors.currentPassword && <Typography variant={"small"} color={"red"}>{errors.currentPassword.message}</Typography>}
            </div>

            {/* New Password */}
            <div className="">
                <Input label={t("new_password")} type="password" variant="outlined"
                    {...register('newPassword', {
                        required: tValidation('requiredField'),
                        minLength: {
                            value: 7,
                            message: tValidation('minLength', { field: t("new_password"), min: 7, max: 40 })
                        },
                        maxLength: {
                            value: 40,
                            message: tValidation('maxLength', { field: t("new_password"), min: 7, max: 40 })
                        }
                    })}
                    error={errors.newPassword}
                />
                {errors.newPassword && <Typography variant={"small"} color={"red"}>{errors.newPassword.message}</Typography>}

            </div>

            {/* Confirm Password */}
            <div className="">
                <Input label={t("confirm_password")} type="password" variant="outlined"
                    {...register('confirmPassword', {
                        required: tValidation('requiredField'),
                        validate: value =>
                            value === newPassword || t('password_not_match')
                    })}
                    error={errors.confirmPassword}
                />
                {errors.confirmPassword && <Typography variant={"small"} color={"red"}>{errors.confirmPassword.message}</Typography>}

            </div>

            {/* Submit Button */}
            <div>
                <Button disabled={!isValid || loading} type="submit" variant="gradient" color="blue"
                    className="flex justify-center items-center w-full"
                >
                    {loading ? <><Loader className="mx-2 animate-spin text-white" /> </> : t('update_password_button')}
                </Button>
            </div>
        </form>
    );
};

export default PasswordUpdateForm;
