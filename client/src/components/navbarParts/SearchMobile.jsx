import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useClientContext} from "../../context/ClientProvider";

function SearchMobile() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryResults, setCategoryResults] = useState([])
    const [userResults, setUserResults] = useState([])
    const {categories,workers:jobs} = useClientContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (searchTerm) {
            const filteredCategories = categories
                .filter(cate => jobs.some(job => job?.category?._id === cate?._id))
                .filter(category => {
                    return Object.values(category?.name || {}).some(name =>
                        name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
                    );
                });
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
    const {t,i18n} = useTranslation('navbar')
    const {language:lng} = i18n
    return (
        <div className="flex-1 lg:hidden">
            <div className="relative w-full">
                <input onChange={(e) => setSearchTerm(e.target.value)}
                    type="text" placeholder={t('search')} value={searchTerm}
                    className="w-full px-1 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <span className="absolute inset-y-0 left-2 flex items-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z"/>
                      </svg>
                </span>
            </div>
            {(userResults.length > 0 || categoryResults.length > 0) && (
                <div className="absolute top-4 left-0 right-0 bg-white border border-gray-300 rounded-md mt-10 shadow-lg max-h-96 overflow-auto z-50">
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
                                    onClick={() => searchAction("cat_id", result?._id)}
                                >
                                        {result?.name?.[lng]}
                                </span>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchMobile;