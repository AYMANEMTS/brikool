import React, {useEffect, useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import ClientApi from "../../api/ClientApi";
import {useLoading} from "../../context/LoadingProvider";
import {useTranslation} from "react-i18next";

function Search({isAtTop}) {
    const {startLoading,stopLoading} = useLoading();
    const {pathname} = useLocation()
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryResults, setCategoryResults] = useState([])
    const [userResults, setUserResults] = useState([])
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

    useEffect(() => {
        if (searchTerm) {
            const filteredCategories = categories
                .filter(cate => jobs.some(job => job.category._id === cate._id))
                .filter(item => item.name.toLowerCase().includes(searchTerm?.toLowerCase()));

            const filteredUsers = [
                ...new Map(jobs
                    .filter(worker => worker.userId.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(worker => [worker.userId._id, worker])
                ).values()
            ];
            setCategoryResults(filteredCategories);
            setUserResults(filteredUsers);
        } else {
            setCategoryResults([]);
            setUserResults([]);
        }
    }, [searchTerm]);

    const searchAction = (type,query) => {
        setSearchTerm("")
        setUserResults([])
        setCategoryResults([])
        navigate(`/workers?${type}=${query}`)
    };
    const {t} = useTranslation('navbar')
    return (
        <>
            {isAtTop && pathname !== '/chat' && (
                <div className="relative hidden md:flex bg-gray-100 border border-transparent focus-within:border-blue-500 focus-within:bg-transparent px-6 rounded-full h-10 lg:w-2/4 mt-3 mx-auto max-lg:mt-6">

                    {/* Search Input */}
                    <SearchIcon sx={{ m: 1 }} />
                    <input
                        type="text"
                        placeholder={t('search')}
                        className="w-full outline-none bg-transparent text-gray-600 font-semibold text-[15px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {(userResults.length > 0 || categoryResults.length > 0) && (
                        <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-10 shadow-lg max-h-48 overflow-auto z-50">
                            {/* Section for Workers */}
                            {userResults.length > 0 && (
                                <>
                                    <h3 className="px-4 py-2 text-lg font-bold text-gray-800">Workers</h3>
                                    {userResults.map((result, key) => (
                                        <span
                                            key={`user-${key}`}
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => searchAction("user_id", result.userId._id)}
                                        >
                                            {result.userId.name}
                                        </span>
                                    ))}
                                </>
                            )}

                            {/* Section for Categories */}
                            {categoryResults.length > 0 && (
                                <>
                                    <h3 className="px-4 py-2 text-lg font-bold text-gray-800 mt-2">Categories</h3>
                                    {categoryResults.map((result, key) => (
                                        <span
                                            key={`category-${key}`}
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => searchAction("cat_id", result._id)}
                                        >
                                        {result.name}
                                    </span>
                                    ))}
                                </>
                            )}
                        </div>
                    )}

                </div>
            )}
        </>
    );
}

export default Search;
