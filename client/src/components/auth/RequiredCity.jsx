import React from 'react';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Typography,
    Select,
    Option
} from '@material-tailwind/react';
import citiesInMorocco from '../../utils/citiesInMorocco';
import ClientApi from '../../api/ClientApi';
import { useLoading } from '../../context/LoadingProvider';
import { useTranslation } from "react-i18next";
import {Controller, useForm} from "react-hook-form";

function RequiredCity({ open, handleOpen }) {
    const {  handleSubmit, control,setError, formState: { errors,isValid } } = useForm();
    const { user, setUser } = useLoading();
    const { i18n } = useTranslation();
    const { language: lng } = i18n;

    const submit = async (data) => {
        try {
            const {city} = data
            const res = await ClientApi.updateClient({ city, name: user.name });
            if (res.status === 200 && res.data) {
                setUser(res.data);
                handleOpen();
            }
        } catch (e) {
            setError('Failed to add city! Try again.');
            console.error(e);
        }
    };

    return (
        <Dialog open={open} handler={handleOpen} size="sm">
            <DialogHeader>
                <Typography variant="h6" color="blue-gray" className="text-center">
                    Select Your City
                </Typography>
            </DialogHeader>
            <DialogBody divider>
                <div className="w-full">
                    <Controller
                        name="city"
                        control={control}
                        rules={{required: 'City is required'}}
                        render={({field}) => (
                            <Select label={"Select City"}{...field} error={errors.city}
                                    value={field.value?.[lng] || ""}
                                    onChange={(val) => {
                                        const selectedCity = citiesInMorocco.find(
                                            (city) => city[lng] === val
                                        );
                                        field.onChange(selectedCity || {ar: "", fr: "", en: ""});
                                    }}
                            >
                                {citiesInMorocco.map((city, key) => (
                                    <Option key={key} value={city[lng]}>
                                        {city[lng]}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                    {errors.city && (
                        <Typography variant="small" color="red">
                            {errors.city.message}
                        </Typography>
                    )}
                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    onClick={handleSubmit(submit)}
                    disabled={!isValid}
                    fullWidth
                >
                    Confirm
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default RequiredCity;
