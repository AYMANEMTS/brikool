import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import citiesInMorocco from "../../../../utils/citiesInMorocco";
import { useTranslation } from "react-i18next";

function SecondForm({ control, errors, setValue }) {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setValue('image', file);
        setImage(file);
    };

    const { i18n } = useTranslation();
    const { language: lng } = i18n;

    return (
        <div className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Row 1: Role and City */}
                <div>
                    <Controller
                        name="role"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Role is required' }}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="bg-white border rounded-md w-full p-2 text-gray-900"
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="client">Client</option>
                                <option value="moderator">Moderator</option>
                                <option value="admin">Admin</option>
                            </select>
                        )}
                    />
                    {errors.role ? (
                        <p className="text-red-500 text-sm">{errors.role.message}</p>
                    ) : (
                        <p className="text-gray-500 ml-3 text-sm">Required</p>
                    )}
                </div>
                <div>
                    <Controller
                        name="city"
                        control={control}
                        rules={{ required: 'City is required' }}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="bg-white border rounded-md w-full p-2 text-gray-900"
                                value={field.value?.[lng] || ""}
                                onChange={(event) => {
                                    const selectedCity = citiesInMorocco.find(
                                        (city) => city[lng] === event.target.value
                                    );
                                    field.onChange(selectedCity || { ar: "", fr: "", en: "" });
                                }}
                            >
                                <option value="" disabled>Select City</option>
                                {citiesInMorocco.map((city, key) => (
                                    <option key={key} value={city[lng]}>
                                        {city?.[lng]}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors.city ? (
                        <p className="text-red-500 text-sm">{errors.city.message}</p>
                    ) : (
                        <p className="text-gray-500 ml-3 text-sm">Required</p>
                    )}
                </div>

                {/* Row 2: Image Input and Preview */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    />
                </div>
                <div className="flex items-center justify-center">
                    {image ? (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="h-24 w-24 rounded-full object-cover"
                        />
                    ) : (
                        <p className="text-gray-500">No image selected</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SecondForm;
