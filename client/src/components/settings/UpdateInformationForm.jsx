import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import citiesInMorocco from "../../utils/citiesInMorocco";
import ClientApi from "../../api/ClientApi";
import displayImage from "../../utils/imageFromServer";
import { useSnackbar } from "notistack";
import {Loader, Pencil} from "lucide-react";
import { useLoading } from "../../context/LoadingProvider";
import { useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import {Input, Button, Select, Option, Typography, Badge, Avatar} from "@material-tailwind/react";

const UpdateInformationForm = () => {
    const { t, i18n } = useTranslation('announces');
    const { language: lng } = i18n;
    const { t: tValidation } = useTranslation('validation');
    const { t: tSetting } = useTranslation('settings');

    const { setUser, user } = useLoading();
    const [loading, setLoading] = useState(false);
    const { register, watch, reset, control, handleSubmit, setValue, formState: { errors } } = useForm();
    const [preview, setPreview] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const [selectedCity, setSelectedCity] = useState(user?.city?.[lng] || '');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setValue('image', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCityChange = (value) => {
        setSelectedCity(value);
        const cityObject = citiesInMorocco.filter(city => city?.[lng] === value);
        setValue('city', cityObject);
    };

    const handleUpdateInformation = async (data) => {
        try {
            setLoading(true);
            data.city = citiesInMorocco.filter(city => city?.[lng] === data.city)[0];
            const res = await ClientApi.updateClient(data);
            if (res.status === 200) {
                setUser(res?.data);
                reset();
                enqueueSnackbar(tSetting('success_update_info'), { variant: "success" });
                await queryClient.invalidateQueries('jobs');
            }
        } catch (e) {
            console.error(e);
            enqueueSnackbar(tSetting('failed_updated_info'), { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            setValue('name', user.name);
            setValue('email', user.email);
            setValue('city', user.city?.[lng]);
            setSelectedCity(user.city?.[lng]);
        }
    }, [user, setValue, lng]);

    const isValid = () => {
        const [name, city, image] = watch(['name', 'city', 'image']);
        const isImageChanged =
            (image && image !== user?.image) ||
            (image?.name && image.name !== user?.image?.name);
        const isCityChanged = city !== user?.city?.[lng];
        return name !== user?.name || isCityChanged || isImageChanged;
    };

    return (
        <>
            <Typography variant={"lead"} className={"text-dark-teal-blue dark:text-bright-yellow mt-4"}>Information</Typography>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"}>
                <div className={"flex flex-row items-center justify-center"}>
                    <label className="cursor-pointer">
                        <Badge placement="top-end" overlap="circular" color="teal" withBorder data-to-toggle={"tooltip"} title={"Change profile image"}
                               className="hover:bg-dark-teal-blue" content={<Pencil className="w-4 h-4"/>}>
                            <Avatar src={displayImage(preview, user)} size="xxl" withBorder color="teal"/>
                        </Badge>
                        <input type="file" accept="image/*" className="hidden"
                               onChange={(e) => handleImageChange(e)}/>
                    </label>
                </div>
                <div className={"space-y-7"}>
                    <div>
                        <Input label={t('name')} required error={errors.name}
                               {...register('name', {
                                   required: {value: true, message: tValidation('requiredField')},
                                   minLength: {
                                       value: 4,
                                       message: tValidation('minLength', {field: t('name'), min: 4, max: 20})
                                   },
                                   maxLength: {
                                       value: 20,
                                       message: tValidation('maxLength', {field: t('name'), min: 4, max: 20})
                                   },
                               })}
                        />
                        {errors.name && (<span className={"text-red-600"}>{errors.name.message}</span>)}
                    </div>
                    <div>
                        <Controller name="city" control={control} defaultValue={selectedCity}
                                    rules={{required: {value: true, message: tValidation('requiredField')}}}
                                    render={({field: {value, onChange}}) => (
                                        <Select value={value?.[lng] || selectedCity} label={t('city')}
                                                onChange={(value) => handleCityChange(value)}>
                                            {citiesInMorocco?.map((city, key) => (
                                                <Option key={key} value={city?.[lng]}>
                                                    {city?.[lng]}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                        />
                        {errors.city && (<span className={"text-red-600"}>{errors.city.message}</span>)}
                    </div>
                    <Button className={"w-full"} onClick={handleSubmit(handleUpdateInformation)} disabled={!isValid()} type="submit" variant="contained" color="blue">
                        {loading ? <><Loader className={"mx-2 animate-spin text-white"} /> </> : t('save')}
                    </Button>
                </div>
            </div>

        </>
    );
};

export default UpdateInformationForm;

