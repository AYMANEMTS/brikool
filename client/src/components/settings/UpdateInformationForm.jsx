import React, { useState } from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {Controller, useForm} from "react-hook-form";
import citiesInMorocco from "../../utils/citiesInMorocco";
import ClientApi from "../../api/ClientApi";
import displayImage from "../../utils/imageFromServer";
import {useSnackbar} from "notistack";
import {Loader} from "lucide-react";

const UpdateInformationForm = ({user={}}) => {
    const [loading, setLoading] = useState(false)
    const [selectedCity, setSelectedCity] = useState(user?.city || '');
    const { register,control, handleSubmit,setValue,
    formState:{errors,isValid,isDirty}} = useForm({mode:"onChange",
        defaultValues: {
            name: user.name || "",
            email: user.email || "",
            city: user.city || "",
            image: user.image || ""
        }
    });
    const [preview, setPreview] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setValue('image',file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value); // Update selected city state
        setValue('city',event.target.value)
    };
    const handleUpdateInformation = async (data) => {
        try {
            setLoading(true)
            const id = user._id
            const res = await ClientApi.updateClient(id,data)
            if(res.status === 200){
                const updatedUser = res?.data
                localStorage.setItem('user',JSON.stringify(updatedUser))
                enqueueSnackbar("You updated successfully",{variant:"success"})
            }
        }catch (e) {
            console.error(e)
            enqueueSnackbar("Failed to updated your information",{variant:"error"})
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex flex-col md:flex-row justify-center items-center p-4">
                {/* Image and File Input */}
                <div className="w-full md:w-1/2 flex flex-col items-center space-y-4 mb-6 md:mb-0">
                    <img
                        src={displayImage(preview,user)}
                        className="object-cover w-36 h-36 rounded-full"
                        alt="avatar"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2"
                    />
                </div>

                {/* Input Fields */}
                <div className="w-full md:w-1/2 space-y-4">
                    <div>
                        <TextField
                            label="Full Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                            helperText={errors.name && errors.name.message}
                            error={!!errors.name}
                            {...register('name',{
                                required: {value: true, message: "This field is required"},
                                minLength: {value: 4, message: "Minimum character is 4"},
                                maxLength: {value: 20, message: "Maximum character is 20"},
                            })}
                        />
                    </div>
                    <div>
                        <TextField disabled={true}
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            required
                            {...register('email')}
                        />
                    </div>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="city-label">City *</InputLabel>
                            <Controller
                                name="city"
                                control={control}
                                defaultValue={selectedCity} // Default value from state or user
                                rules={{ required: {value: true, message: "City Field is required"} }}
                                render={({ field }) => (
                                    <Select
                                        error={!!errors.city}
                                        labelId="city-label"
                                        id="city"
                                        label="City"
                                        value={field.value || ''} // Controlled value from Controller
                                        onChange={(e) => {
                                            field.onChange(e); // Call React Hook Form's onChange
                                            handleCityChange(e); // Also update local state
                                        }}
                                        required
                                    >
                                        {citiesInMorocco?.map((city, key) => (
                                            <MenuItem key={key} value={city}>
                                                {city}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                )}
                            />
                            {errors.city && (<span className={"text-red-600"}>{errors.city.message}</span>)}
                        </FormControl>
                    </div>
                    <div>
                        <Button onClick={handleSubmit(handleUpdateInformation)} disabled={!isValid || !isDirty || loading}
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2, mb: 1}}
                        >
                            {loading ? <><Loader className={" mx-2 animate-spin text-white"} /> loading</> : "Save"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateInformationForm;
