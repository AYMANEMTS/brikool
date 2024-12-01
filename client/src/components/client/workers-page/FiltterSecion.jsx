import React, { useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useQueryClient } from 'react-query';
import { Controller, useForm } from "react-hook-form";
import citiesInMorocco from "../../../utils/citiesInMorocco";
import {useSearchParams} from "react-router-dom";

function FiltterSecion({ jobs, setFiltredJobS }) {
    const [searchParams,setSearchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const fake = queryClient.getQueryData('categories');
    const categories = fake?.data?.category || [];
    const { control, watch,setValue } = useForm({defaultValues:{city:'all',category:'all',userId:'all'}});

    const cityParams = searchParams.get('city')
    const category_idParams = searchParams.get('cat_id')
    const user_idParams = searchParams.get('user_id')

    const selectedCity = watch('city', 'all');
    const selectedCategory = watch('category', 'all');
    const selectedUser = watch('userId', 'all');

    useEffect(() => {
        if (cityParams) setValue('city', cityParams);
        if (category_idParams) setValue('category', category_idParams);
        if (user_idParams) setValue('userId', user_idParams);
    }, [cityParams, category_idParams, user_idParams, setValue]);

    useEffect(() => {
        let filteredJobs = jobs;
        if (selectedCity !== 'all') {
            filteredJobs = filteredJobs.filter(job => job.userId.city === selectedCity);
        }
        if (selectedCategory !== 'all') {
            filteredJobs = filteredJobs.filter(job => job.category._id === selectedCategory);
        }
        if (selectedUser !== 'all'){
            filteredJobs = filteredJobs.filter(job => job.userId._id === selectedUser)
        }
        setFiltredJobS(filteredJobs);
    }, [selectedCity, selectedCategory, jobs, setFiltredJobS,selectedUser]);
     return (
         <>
             <div className="p-6 rounded-lg shadow-lg mb-3">
                 <h2 className="text-2xl font-semibold mb-4">Filter Workers</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {/* City Select */}
                     <div>
                         <FormControl fullWidth variant="outlined" size="small">
                             <InputLabel id="city-label">City *</InputLabel>
                             <Controller
                                 control={control}
                                 name="city"
                                 defaultValue="all" // Default value for city
                                 render={({field}) => (
                                     <Select
                                         labelId="city-label"
                                         label="City *"
                                         {...field}
                                     >
                                         <MenuItem value={"all"}>All City</MenuItem>
                                         {citiesInMorocco
                                             .filter(city => jobs.some(job => job.userId.city === city))
                                             .map((city, key) => (
                                                 <MenuItem key={key} value={city}>
                                                     {city}
                                                 </MenuItem>
                                             ))
                                         }
                                     </Select>
                                 )}
                             />
                         </FormControl>
                     </div>

                     {/* Category Select */}
                     <div>
                         <FormControl fullWidth variant="outlined" size="small">
                             <InputLabel id="category-label">Category *</InputLabel>
                             <Controller
                                 control={control}
                                 name="category"
                                 defaultValue="all" // Default value for category
                                 render={({field}) => (
                                     <Select
                                         labelId="category-label"
                                         label="Category *"
                                         {...field}
                                     >
                                         <MenuItem value="all">All Categories</MenuItem>
                                         {categories
                                             .filter(cate => jobs.some(job => job.category._id === cate._id))
                                             .map((category) => (
                                                 <MenuItem key={category._id} value={category._id}>
                                                     {category.name}
                                                 </MenuItem>
                                             ))}
                                     </Select>
                                 )}
                             />
                         </FormControl>
                     </div>
                 </div>
             </div>
             {selectedUser !== 'all' && (
                 <button onClick={() => {
                     setFiltredJobS(jobs)
                     setValue('userId','all')
                     setSearchParams({})
                 }}
                     className={"p-2 bg-blue-500 text-white text-lg font-bold w-full rounded-lg mb-4 hover:bg-blue-800"}>All
                     workers</button>
             )}
         </>
     );
}

export default FiltterSecion;
