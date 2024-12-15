import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ClientApi from "../../api/ClientApi";
import { useSnackbar } from "notistack";
import {Eye, EyeOff, Loader} from "lucide-react";
import { useTranslation } from "react-i18next";
import {Input, Button, Alert, Typography} from "@material-tailwind/react";

const PasswordUpdateForm = () => {
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({ mode: "onChange" });
    const [errorMessage, setErrorMessage] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation('settings');
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
    })
    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };
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
        <>
            <Typography variant={"lead"} className={"text-dark-teal-blue dark:text-bright-yellow mt-4"}>Password</Typography>
            {errorMessage !== null && (
                <Alert color="red" className={"text-md font-semibold mt-2"}>
                    {errorMessage}
                </Alert>
            )}
            <div className={"mt-2"}>
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 m"}>
                    <div className={"relative"}>
                        <Input label={t("current_password")} className={"pr-9"}
                               type={showPassword.currentPassword ? "text" : "password"} {...register('currentPassword', {
                            required: tValidation('requiredField'),
                            minLength: {
                                value: 7,
                                message: tValidation('minLength', {field: t("current_password"), min: 7, max: 40})
                            },
                            maxLength: {
                                value: 40,
                                message: tValidation('maxLength', {field: t("current_password"), min: 7, max: 40})
                            }
                        })} />
                        <div className={"absolute inset-y-4 right-3 cursor-pointer"}
                             onClick={() => togglePasswordVisibility("currentPassword")}>
                            {showPassword.currentPassword ?
                                <EyeOff className={"text-teal-blue hover:text-dark-teal-blue h-5 w-5 "}/>
                                :
                                <Eye className={"text-teal-blue hover:text-dark-teal-blue h-5 w-5 "}/>
                            }
                        </div>
                        {errors.currentPassword &&
                            <Typography variant={"small"} color={"red"}>{errors.currentPassword.message}</Typography>
                        }

                    </div>

                    <div className={"relative"}>
                        <Input label={t("new_password")} className={"pr-9"}
                               type={showPassword.newPassword ? "text" : "password"} {...register('newPassword', {
                            required: tValidation('requiredField'),
                            minLength: {
                                value: 7,
                                message: tValidation('minLength', {field: t("new_password"), min: 7, max: 40})
                            },
                            maxLength: {
                                value: 40,
                                message: tValidation('maxLength', {field: t("new_password"), min: 7, max: 40})
                            }
                        })}/>
                        <div className={"absolute inset-y-4 right-3 cursor-pointer"}
                             onClick={() => togglePasswordVisibility("newPassword")}>
                            {showPassword.newPassword ?
                                <EyeOff className={"text-teal-blue hover:text-dark-teal-blue h-5 w-5 "}/>
                                :
                                <Eye className={"text-teal-blue hover:text-dark-teal-blue h-5 w-5 "}/>
                            }
                        </div>
                        {errors.newPassword &&
                            <Typography variant={"small"} color={"red"}>{errors.newPassword.message}</Typography>
                        }

                    </div>
                </div>
                <div className={"flex justify-end mt-4"}>
                    <Button disabled={!isValid || loading} className={"w-full md:w-1/3"} onClick={handleSubmit(handleForm)}>
                        {loading ? <>
                            <Loader className="mx-2 animate-spin text-white"/>
                        </> : t('update_password_button')
                        }
                    </Button>
                </div>
            </div>
        </>

    );
};

export default PasswordUpdateForm;
