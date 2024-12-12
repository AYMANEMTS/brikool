import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useClientContext} from "../../context/ClientProvider";
import {Search as SearchIcon} from "lucide-react";

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
        <div className="flex-1 lg:hidden md:hidden">
            <div className="relative w-full bg-gray-200 mx-1 dark:bg-gray-700 rounded-lg focus-within:bg-transparent">
                <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder={t('search')}
                    value={searchTerm}
                    className="w-full px-1 py-1 pl-10 border border-gray-300 dark:border-bright-yellow rounded-lg focus:outline-none focus:ring text-teal-blue placeholder:text-teal-blue font-semibold placeholder:dark:text-bright-yellow dark:text-bright-yellow dark:bg-gray-800"
                />

                <SearchIcon className="absolute inset-y-1 left-2 flex items-center text-teal-blue dark:text-bright-yellow"/>
            </div>
            {(userResults.length > 0 || categoryResults.length > 0) && (
                <div
                    className="absolute top-4 left-0 right-0 bg-white dark:bg-teal-blue border border-gray-300 dark:border-gray-700 rounded-md mt-10 shadow-lg max-h-96 overflow-auto z-50">
                    {/* Section for Workers */}
                    {userResults.length > 0 && (
                        <>
                            <h3 className="px-4 py-2 text-lg font-bold text-teal-blue dark:text-bright-yellow">
                                Workers
                            </h3>
                            {userResults.map((result, key) => (
                                <span
                                    key={`user-${key}`}
                                    className="block px-4 py-2 text-teal-blue dark:text-bright-yellow hover:bg-teal-blue dark:hover:bg-bright-yellow hover:text-white dark:hover:text-black cursor-pointer transition-colors duration-300"
                                    onClick={() => searchAction('user_id', result.userId._id)}
                                >
              {result.userId.name}
            </span>
                            ))}
                        </>
                    )}
                    {/* Section for Categories */}
                    {categoryResults.length > 0 && (
                        <>
                            <h3 className="px-4 py-2 text-lg font-bold text-teal-blue dark:text-bright-yellow mt-2">
                                Categories
                            </h3>
                            {categoryResults.map((result, key) => (
                                <span
                                    key={`category-${key}`}
                                    className="block px-4 py-2 text-teal-blue dark:text-bright-yellow hover:bg-teal-blue dark:hover:bg-bright-yellow cursor-pointer transition-colors duration-300"
                                    onClick={() => searchAction('cat_id', result?._id)}
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