import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import citiesInMorocco from "../../utils/citiesInMorocco";
import ClientApi from "../../api/ClientApi";
import displayImage from "../../utils/imageFromServer";
import { useSnackbar } from "notistack";
import { Loader } from "lucide-react";
import { useLoading } from "../../context/LoadingProvider";
import { useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import {Input, Button, Select, Option} from "@material-tailwind/react";

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
        console.log(value)
        setSelectedCity(value);
        const cityObject = citiesInMorocco.filter(city => city?.[lng] === value);
        console.log(cityObject)
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
            setSelectedCity(user.city?.[lng]); // Ensure selectedCity is updated on user change
        }
    }, [user, setValue, lng]);

    const isValid = () => {
        const [name, city, image] = watch(['name', 'city', 'image']);
        const isImageChanged =
            (image && image !== user?.image) ||
            (image?.name && image.name !== user?.image?.name);

        // Check if the city has changed by comparing the selected city and the city in the form
        const isCityChanged = city !== user?.city?.[lng];

        return name !== user?.name || isCityChanged || isImageChanged;
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center p-4">
                {/* Image and File Input */}
                <div className="w-full md:w-1/2 flex flex-col items-center space-y-4 mb-6 md:mb-0">
                    <img
                        src={displayImage(preview, user)}
                        className="object-cover w-36 h-36 rounded-full"
                        alt="avatar"
                    />
                    <label className={"p-2 bg-teal-600 text-white font-semibold cursor-pointer rounded"} htmlFor={"user_image"}>
                        {t('chose_image')}
                    </label>
                    <input id={"user_image"} type="file" accept="image/*" onChange={handleImageChange} className="mt-2" hidden/>
                </div>

                {/* Input Fields */}
                <div className="w-full md:w-1/2 space-y-8">
                    <div>
                        <Input label={t('name')} required error={errors.name}
                               {...register('name', {
                                   required: { value: true, message: tValidation('requiredField') },
                                   minLength: { value: 4, message: tValidation('minLength', { field: t('name'), min: 4, max: 20 }) },
                                   maxLength: { value: 20, message: tValidation('maxLength', { field: t('name'), min: 4, max: 20 }) },
                               })}
                        />
                        {errors.name && (<span className={"text-red-600"}>{errors.name.message}</span>)}
                    </div>
                    <div>
                        <Input disabled={true} label={t('email')} type="email"{...register('email')}/>
                    </div>
                    <div>
                        <Controller name="city" control={control} defaultValue={selectedCity}
                            rules={{ required: { value: true, message: tValidation('requiredField') } }}
                            render={({ field: { value, onChange } }) => (
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
                    <div>
                        <Button className={"w-full"} onClick={handleSubmit(handleUpdateInformation)} disabled={!isValid()} type="submit" variant="contained" color="blue">
                            {loading ? <><Loader className={"mx-2 animate-spin text-white"} /> </> : t('save')}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateInformationForm;
