import React, {useEffect, useState} from 'react';
import {Button, IconButton, Input, Option, Select} from "@mui/joy";
import displayImage from "../../../utils/imageFromServer";
import citiesInMorocco from "../../../utils/citiesInMorocco";
import {useAdminContext} from "../../../context/AdminProvider";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {useSearchParams} from "react-router-dom";

function Filters({setFilteredJobs}) {
    const [selectedUser, setSelectedUser] = useState("All Users");
    const [selectedCategories, setSelectedCategories] = useState("All Categories");
    const [selectedCity, setSelectedCity] = useState("All Cities")
    const [selectedStatus, setSelectedStatus] = useState("Status")
    const [search, setSearch] = useState("");
    const [searchParams,setSearchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    const {users,jobs,categories} = useAdminContext();

    {/* for search preview */}
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );
    const filteredCities = citiesInMorocco.filter(city =>
        city.toLowerCase().includes(search.toLowerCase())
    );

    const applyFilters = () => {
        let filtered = jobs;
        if (selectedCity !== "All Cities") {
            filtered = filtered.filter((job) => job.userId.city === selectedCity);
        }
        if (selectedCategories !== "All Categories") {
            filtered = filtered.filter((job) => job.category._id === selectedCategories);
        }
        if (selectedUser !== "All Users") {
            filtered = filtered.filter((job) => job.userId._id === selectedUser);
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
    }, [userId,users]);

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
                <div className="flex mb-4 ">
                    <Input className={"mx-2 py-1"}
                           startDecorator={<SearchIcon/>}
                           endDecorator={<Button>Search</Button>}
                           placeholder="Search users,categories,cities..."
                           sx={{
                               "--Input-radius": "7px",
                           }}
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                           fullWidth
                    />
                    {/* Reset */}
                    <IconButton size={"sm"} variant="solid" onClick={handleResetFilters}>
                        <RestartAltIcon/>
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
                                                 setSelectedUser(user._id)
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
                                                 setSelectedCategories(category._id)
                                                 setSearch("")
                                             }}>
                                            {category.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Cities Preview */}
                        {filteredCities.length > 0 && (
                            <div className="mb-2">
                                <h4 className="font-medium text-sm mb-1 text-gray-700">Cities</h4>
                                <div className="space-y-2">
                                    {filteredCities.map((city, index) => (
                                        <div key={index}
                                             className="text-sm font-semibold p-1 rounded hover:bg-gray-200 cursor-pointer"
                                             onClick={() => {
                                                 setSelectedCity(city)
                                                 setSearch("")
                                             }}>
                                            {city}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* No results message */}
                        {filteredUsers.length === 0 && filteredCategories.length === 0 && filteredCities.length === 0 && (
                            <div className="text-sm text-gray-500">No results found</div>
                        )}
                    </div>
                )}

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {/* Category Filter */}
                    <Select defaultValue={selectedCategories}
                            onChange={(event, value) => setSelectedCategories(value)}>
                        <Option value="All Categories">All Categories</Option>
                        {categories
                            ?.filter(cate => jobs.some(job => job.category._id === cate._id))
                            ?.map((category, key) => (
                                <Option key={key} value={category._id}>{category.name}</Option>
                            ))}
                    </Select>

                    {/* User Filter */}
                    <Select value={selectedUser}
                            onChange={(event, value) => setSelectedUser(value)}>
                        <Option value="All Users">All Users</Option>
                        {users
                            ?.filter((user) => user.role === 'client')
                            ?.filter((user) => jobs.some(job => job.userId._id === user._id))
                            ?.map((user, key) => (
                            <Option key={key} value={user._id}>
                                <div className={"flex items-center space-x-2"}>
                                    <img src={displayImage('', user)} alt={user?.name}
                                         className="w-8 h-8 object-cover rounded-full"/>
                                    <span>{user?.name}</span>
                                </div>
                            </Option>
                        ))}
                    </Select>

                    {/* City Filter */}
                    <Select defaultValue={selectedCity}
                            onChange={(event, value) => setSelectedCity(value)}>
                        <Option value="All Cities">All Cities</Option>
                        {citiesInMorocco
                            ?.filter(city => jobs.some(job => job.userId.city === city))
                            ?.map((city, key) => (
                                <Option key={key} value={city}>{city}</Option>
                            ))}
                    </Select>

                    {/* Status  */}
                    <Select defaultValue={selectedStatus} onChange={(event, value) => setSelectedStatus(value)}>
                        <Option value="Status">Status</Option>
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                        <Option value="suspended">Suspended</Option>
                    </Select>

                    {/* Order By Filter */}
                    <Select defaultValue="OrderBy">
                        <Option value="OrderBy">OrderBy</Option>
                        <Option value="cat">Asc</Option>
                        <Option value="fish">Desc</Option>
                    </Select>
                </div>
            </div>
        </>
    );
}

export default Filters;