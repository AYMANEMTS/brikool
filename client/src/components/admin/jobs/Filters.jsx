import React, {useEffect, useState} from 'react';
import { IconButton, Input} from "@material-tailwind/react";
import displayImage from "../../../utils/imageFromServer";
import citiesInMorocco from "../../../utils/citiesInMorocco";
import {useAdminContext} from "../../../context/AdminProvider";
import {useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {RotateCcw, Search} from "lucide-react"
function Filters({setFilteredJobs}) {
    const [selectedUser, setSelectedUser] = useState("All Users");
    const [selectedCategories, setSelectedCategories] = useState("All Categories");
    const [selectedCity, setSelectedCity] = useState("All Cities")
    const [selectedStatus, setSelectedStatus] = useState("Status")
    const [search, setSearch] = useState("");
    const [searchParams,setSearchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");
    const {users,jobs,categories} = useAdminContext();
    const {i18n} = useTranslation()
    const {language:lng} = i18n

    {/* for search preview */}
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );
    const filteredCategories = categories.filter(category =>
        category?.name?.[lng].toLowerCase().includes(search?.toLowerCase())
    );

    const applyFilters = () => {
        let filtered = jobs;
        if (selectedCity !== "All Cities") {
            filtered = filtered.filter((job) => job.userId.city?.[lng] === selectedCity?.[lng]);
        }
        if (selectedCategories !== "All Categories") {
            filtered = filtered.filter((job) => job.category?._id === selectedCategories);
        }
        if (selectedUser !== "All Users") {
            filtered = filtered.filter((job) => job.userId?._id === selectedUser);
        }
        if (selectedStatus !== "Status") {
            filtered = filtered.filter((job) => job.status === selectedStatus);
        }
        setFilteredJobs(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [selectedCity, selectedCategories, selectedUser, selectedStatus, jobs]);

    useEffect(() => {
        if (userId){
            setSelectedUser(userId);
        }
        if (categoryId){
            setSelectedCategories(categoryId)
        }
    }, [userId,categoryId,users]);

    const handleResetFilters = () => {
        setSelectedCity("All Cities");
        setSelectedCategories("All Categories");
        setSelectedUser("All Users");
        setSelectedStatus("Status");
        setSearch("");
        setSearchParams({})
    };


    return (
        <>
            <div className="bg-white p-4 shadow-md rounded-lg mb-6">
                {/* Search Input */}
                <div className="flex mb-4 space-x-2 items-center ">
                    <Input size={"sm"} icon={<Search />} label="Search " placeholder={"users,categories,cities..."}
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* Reset */}
                    <IconButton className={"py-4"} size={"sm"} variant="solid" onClick={handleResetFilters}>
                        <RotateCcw />
                    </IconButton>
                </div>

                {/* Search Preview */}
                {search && (
                    <div className="mt-2 p-4 bg-white shadow-md rounded-lg">

                        {/* Users Preview */}
                        {filteredUsers.length > 0 && (
                            <div className="mb-2">
                                <h4 className="font-medium text-sm mb-1 text-gray-700">Users</h4>
                                <div className="space-y-2">
                                    {filteredUsers.map((user, index) => (
                                        <div key={index}
                                             className="flex items-center space-x-2 text-sm font-semibold p-1 rounded hover:bg-gray-200 cursor-pointer"
                                             onClick={() => {
                                                 setSelectedUser(user?._id)
                                                 setSearch("")
                                             }}>
                                            <img
                                                src={displayImage('', user)}
                                                alt={user?.name}
                                                className="w-8 h-8 object-cover rounded-full"
                                            />
                                            <span>{user.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Categories Preview */}
                        {filteredCategories.length > 0 && (
                            <div className="mb-2">
                                <h4 className="font-medium text-sm mb-1 text-gray-700">Categories</h4>
                                <div className="space-y-2">
                                    {filteredCategories.map((category, index) => (
                                        <div key={index}
                                             className="text-sm font-semibold p-1 rounded hover:bg-gray-200 cursor-pointer"
                                             onClick={() => {
                                                 setSelectedCategories(category?._id)
                                                 setSearch("")
                                             }}>
                                            {category?.name?.[lng]}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                        {/* No results message */}
                        {filteredUsers.length === 0 && filteredCategories.length === 0 && (
                            <div className="text-sm text-gray-500">No results found</div>
                        )}
                    </div>
                )}

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {/* Category Filter */}
                    <select
                        value={selectedCategories}
                        onChange={(event) => setSelectedCategories(event.target.value)}
                        className="bg-white border rounded-md w-full p-2 text-gray-900"
                    >
                        <option value="All Categories">All Categories</option>
                        {categories
                            ?.filter(cate => jobs.some(job => job.category?._id === cate?._id))
                            ?.map((category, key) => (
                                <option key={key} value={category?._id}>{category?.name?.[lng]}</option>
                            ))}
                    </select>

                    {/* User Filter */}
                    <select
                        value={selectedUser}
                        onChange={(event) => setSelectedUser(event.target.value)}
                        className="bg-white border rounded-md w-full p-2 text-gray-900"
                    >
                        <option value="All Users">All Users</option>
                        {users
                            ?.filter((user) => user.role === 'client')
                            ?.filter((user) => jobs.some(job => job.userId?._id === user?._id))
                            ?.map((user, key) => (
                                <option key={key} value={user?._id}>
                                    <div className={"flex items-center space-x-2"}>
                                        <img
                                            src={displayImage('', user)}
                                            alt={user?.name}
                                            className="w-8 h-8 object-cover rounded-full"
                                        />
                                        <span>{user?.name}</span>
                                    </div>
                                </option>
                            ))}
                    </select>

                    {/* City Filter */}
                    <select
                        value={selectedCity}
                        onChange={(event) => setSelectedCity(event.target.value)}
                        className="bg-white border rounded-md w-full p-2 text-gray-900"
                    >
                        <option value="All Cities">All Cities</option>
                        {citiesInMorocco
                            ?.filter(city => jobs.some(job => job?.userId?.city?.[lng] === city?.[lng]))
                            ?.map((city, key) => (
                                <option key={key} value={city}>{city?.[lng]}</option>
                            ))}
                    </select>

                    {/* Status Filter */}
                    <select
                        value={selectedStatus}
                        onChange={(event) => setSelectedStatus(event.target.value)}
                        className="bg-white border rounded-md w-full p-2 text-gray-900"
                    >
                        <option value="Status">Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                    </select>

                    {/* Order By Filter */}
                    <select
                        value="OrderBy"
                        className="bg-white border rounded-md w-full p-2 text-gray-900"
                    >
                        <option value="OrderBy">Order By</option>
                        <option value="cat">Asc</option>
                        <option value="fish">Desc</option>
                    </select>
                </div>
            </div>
        </>
    );
}

export default Filters;