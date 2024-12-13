import React, {useEffect, useState} from 'react';
import {Search as SearchIcon}  from 'lucide-react'
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useClientContext} from "../../context/ClientProvider";

function Search({isAtTop}) {
    const {pathname} = useLocation()
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
        <div>
            {isAtTop && pathname !== '/chat' && (
                <div
                    className={`relative hidden md:flex  items-center space-x-2 bg-gray-200 dark:bg-gray-700 border border-teal-blue dark:border-bright-yellow focus-within:border-teal-blue focus:border-2 focus-within:bg-gray-50 dark:focus-within:bg-gray-900 px-6 rounded-full h-10 lg:w-2/4 mt-3 mx-auto max-lg:mt-6 transition-colors duration-300`}
                >
                    {/* Search Input */}
                    <SearchIcon className="h-6 w-6 text-teal-blue dark:text-bright-yellow"/>
                    <input
                        type="text"
                        placeholder={t('search')}
                        className="w-full outline-none bg-transparent  text-teal-blue dark:text-bright-yellow font-semibold text-[15px] transition-colors duration-300 placeholder:text-teal-blue dark:placeholder:text-bright-yellow "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {(userResults.length > 0 || categoryResults.length > 0) && (
                        <div className="absolute top-2 left-0 right-0 bg-white dark:bg-teal-blue border border-gray-300 dark:border-gray-700 rounded-md mt-10 shadow-lg max-h-80 overflow-auto z-50">
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
            )}
        </div>


    );
}

export default Search;
