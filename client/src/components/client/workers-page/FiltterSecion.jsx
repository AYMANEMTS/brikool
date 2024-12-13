import React, {useEffect} from 'react';
import citiesInMorocco from "../../../utils/citiesInMorocco";
import {useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useClientContext} from "../../../context/ClientProvider";
import { Controller, useForm } from "react-hook-form";
import {Select, Option} from "@material-tailwind/react"
import {useLoading} from "../../../context/LoadingProvider";

function FilterSection({ jobs, setFiltredJobS }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { categories } = useClientContext();
    const { t, i18n } = useTranslation('announces');
    const { language: lng } = i18n;
    const {darkMode} = useLoading()

    const { control, watch, setValue } = useForm({
        defaultValues: {
            city: 'all',
            category: 'all',
            userId: 'all',
            orderBy: 'all',
        },
    });

    const selectedCity = watch('city');
    const selectedCategory = watch('category');
    const selectedUser = watch('userId');

    useEffect(() => {
        const category_idParams = searchParams.get('cat_id');
        const user_idParams = searchParams.get('user_id');
        if (category_idParams) setValue('category', category_idParams);
        if (user_idParams) setValue('userId', user_idParams);
    }, [searchParams, setValue]);

    useEffect(() => {
        let filteredJobs = jobs;

        if (selectedCity !== 'all') {
            filteredJobs = filteredJobs.filter(job => job.userId.city?.[lng] === selectedCity);
        }
        if (selectedCategory !== 'all') {
            filteredJobs = filteredJobs.filter(job => job.category?._id === selectedCategory);
        }
        if (selectedUser !== 'all') {
            filteredJobs = filteredJobs.filter(job => job.userId._id === selectedUser);
        }

        setFiltredJobS(filteredJobs);
    }, [selectedCity, selectedCategory, selectedUser, jobs, setFiltredJobS, lng]);

    return (
        <>
            <div className="p-6 rounded-lg bg-gray-200 mb-6 dark:bg-gray-800 dark:text-white">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Controller name="city" control={control}
                        render={({field}) => {
                            const allCitiesWithDefaultValue = [...citiesInMorocco
                                .filter(city => jobs.some(job => city.en !== 'all' && job.userId.city?.[lng] === city?.[lng])),
                                {en: "all",fr: "all",ar: "all"}]
                            return <Select label={t('city')} {...field} value={field.value?.[lng] || "all"}
                                           onChange={(val) => {
                                               field.onChange(val)
                                               setValue('city', val)}} >
                                            {allCitiesWithDefaultValue.reverse()
                                                ?.map((city, key) => (
                                                    city[lng] === 'all' ?
                                                        <Option key={key} value={'all'}>{t('all_city')}</Option> :
                                                        <Option key={key} value={city[lng]}>
                                                            {city[lng]}
                                                        </Option>
                                                ))}
                                    </Select>
                            }}
                    />


                    <Controller name="category" control={control}
                                render={({field}) => {
                                    const allCategoriesWithDefaultValue = [...categories
                                        .filter(cate => jobs.some(job => job.category?._id === cate._id)),
                                        {en: "all",fr: "all",ar: "all"}]
                                    return <Select label={t('category')} {...field} value={field.value?.[lng] || "all"}
                                                   onChange={(val) => {
                                                       field.onChange(val)
                                                       setValue('category', val)}}>
                                            {allCategoriesWithDefaultValue.reverse()
                                                ?.map((cate, key) => (
                                                    cate[lng] === 'all' ?
                                                        <Option key={key} value={'all'}>{t('all_category')}</Option> :
                                                        <Option key={key} value={cate._id}>
                                                            {cate?.name?.[lng]}
                                                        </Option>
                                                ))}
                                        </Select>
                                    }}
                    />

                    {/* Order Select */}
                    <Controller control={control} name="orderBy"
                        render={({ field }) => (
                            <Select label={t('order_by')} {...field}>
                                <Option value="all">{t('order_by')}</Option>
                                <Option value="name">{t('order_by_name')}</Option>
                                <Option value="createdAt">{t('order_by_created_at')}</Option>
                                <Option value="reviewed">{t('order_by_reviewed')}</Option>
                            </Select>
                        )}
                    />
                </div>
            </div>

            {selectedUser !== 'all' && (
                <button
                    onClick={() => {
                        setFiltredJobS(jobs);
                        setValue('userId', 'all');
                        setSearchParams({});
                    }}
                    className="p-2 bg-blue-500 text-white text-lg font-bold w-full rounded-lg mb-4 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                    {t('all_workers')}
                </button>
            )}
        </>
    );
}

export default FilterSection;
