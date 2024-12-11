import React from 'react';
import { Controller } from 'react-hook-form';
import displayImage from '../../../utils/imageFromServer';
import { useQueryClient } from 'react-query';
import {Input} from "@material-tailwind/react";

function InformationForm({ control, user, errors, job, t, lng }) {
    const queryClient = useQueryClient();
    const categories = queryClient.getQueryData('categories')?.data?.category || [];

    return (
        <>
            <h2 className="mb-4 font-bold text-gray-800 pl-2 flex justify-center">{t('information')}</h2>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Image Preview */}
                <div className="flex justify-center items-center">
                    <img
                        src={displayImage('', user)}
                        className="object-cover w-36 h-36 rounded-full border-4 border-gray-300"
                        alt="avatar"
                    />
                </div>

                {/* Input Fields */}
                <div>
                    <div className="space-y-4">
                        <div>
                            <Input label={t('name')}
                                type="text"
                                value={user?.name}
                                disabled
                            />
                        </div>
                        <div>
                            <Input label={t('city')}
                                type="text"
                                value={user?.city?.[lng]}
                                disabled
                            />
                        </div>
                        <div>
                            <div className="relative">
                                <label
                                    htmlFor="category"
                                >
                                    {t('category')}
                                </label>
                                <Controller
                                    name="category"
                                    control={control}
                                    defaultValue={job?.category?._id || ''}
                                    rules={{ required: 'Category field is required' }}
                                    render={({ field }) => (
                                        <select
                                            id="category"
                                            {...field}
                                            className={`w-full p-3 rounded-md border bg-white text-black border-gray-300`}
                                        >
                                            <option value={""}>{t('category')}</option>
                                            {categories?.map((category, key) => (
                                                <option key={key} value={category._id}>
                                                    {category?.name?.[lng]}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                                {errors.category && (
                                    <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InformationForm;
