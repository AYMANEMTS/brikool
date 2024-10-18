import React, {useEffect, useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import citiesInMorocco from "../../utils/citiesInMorocco";
import { MenuItem, Select} from "@mui/material";
import {useQuery, useQueryClient} from "react-query";
import ClientApi from "../../api/ClientApi";
import {useLoading} from "../../context/LoadingProvider";

function Search({isAtTop}) {
    const {startLoading,stopLoading} = useLoading();
    const {pathname} = useLocation()
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const queryClient = useQueryClient()
    const cashedCategories = queryClient.getQueryData('categories')?.data?.data?.category || []
    const {data:categories=[],isFetching:isFetchingCategory} = useQuery('categories',ClientApi.getCategories,{
        initialData: cashedCategories.length > 0 ? cashedCategories : undefined,
        select: (data) => data.data.category,
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: () => stopLoading(),
        onError: () => stopLoading(),
        cacheTime: 5 * 60 * 1000,
        staleTime: 1000*60
    })
    const {data:jobs=[],isFetching:isFetchingJobs} = useQuery("jobs",ClientApi.getJobs,{
        select: (data => data.data),
        onSuccess: () => stopLoading(),
        onError: () => stopLoading(),
        retry: 0,
        refetchOnWindowFocus: false,
        cacheTime: 5 * 60 * 1000,
        staleTime: 1000*60
    })
    useEffect(() => {
        const isLoading = isFetchingJobs || isFetchingCategory;
        if (isLoading) {
            startLoading();
        } else {
            const stopLoadingTimeout = setTimeout(() => stopLoading(), 300);
            return () => clearTimeout(stopLoadingTimeout);
        }
    }, [isFetchingJobs, isFetchingCategory, startLoading, stopLoading]);


    const navigate = useNavigate()
    const [selectedCity, setSelectedCity] = useState("all")
    useEffect(() => {
        if (searchTerm) {
            const resultsCategories = categories
                .filter(cate => jobs.some(job => job.category._id === cate._id))
                .filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const resultsJobs = jobs.filter(item =>
                item.userId.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const mergeResult = pathname === '/workers' ? resultsJobs : [...resultsCategories,...resultsJobs]
            setSearchResults(mergeResult);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const searchAction = (result) => {
        setSearchTerm({})
        result.name ? navigate(`/workers?city=${selectedCity}&cat_id=${result._id}`) : navigate(`/worker/${result._id}`)
        setSearchResults([])
        setSearchTerm("")
    }

    return (
        <>
            {isAtTop && pathname !== '/chat' && (
                <div className="relative hidden md:flex bg-gray-100 border border-transparent focus-within:border-blue-500 focus-within:bg-transparent px-6 rounded-full h-10 lg:w-2/4 mt-3 mx-auto max-lg:mt-6">

                    {pathname !== '/workers' && (
                        <Select onChange={(e) => setSelectedCity(e.target.value)}
                                labelId="city-label"
                                defaultValue={"all"}
                                label="City *"
                                sx={{
                                    bgcolor: 'transparent', // background color
                                    border: 'none', // remove border
                                    color: 'text.primary', // text color
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none', // remove the outlined border
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        border: 'none', // remove the border on hover
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        border: 'none', // remove the focused border
                                    },
                                }}
                        >
                            <MenuItem value={"all"}>All</MenuItem>
                            {citiesInMorocco
                                ?.filter(city => jobs.some(job => job.userId.city === city))
                                ?.map((city, key) => (
                                    <MenuItem key={key} value={city}>
                                        {city}
                                    </MenuItem>
                                ))}
                        </Select>
                    )}

                    {/* Search Input */}
                    <SearchIcon sx={{ m: 1 }} />
                    <input
                        type="text"
                        placeholder="Search category"
                        className="w-full outline-none bg-transparent text-gray-600 font-semibold text-[15px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                    />

                    {/* Search Preview */}
                    {searchResults.length > 0 && (
                        <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-10 rounded-2xl shadow-lg max-h-48 overflow-auto z-50">
                            {searchResults.map((result,key) => (
                                <span key={key} className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                onClick={() => searchAction(result)}  >
                                    {result.name ? result.name : result.userId.name }
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Search;