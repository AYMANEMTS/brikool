import React, {useEffect, useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import {Link, useLocation} from "react-router-dom";
import citiesInMorocco from "../../utils/citiesInMorocco";
import { MenuItem, Select} from "@mui/material";
import {useQuery, useQueryClient} from "react-query";
import ClientApi from "../../api/ClientApi";

function Search({isAtTop}) {
    const {pathname} = useLocation()
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const {data:categories=[]} = useQuery('categories',ClientApi.getCategories,{
        select: (data) => data.data.category,
        retry: false
    })

    useEffect(() => {
        if (searchTerm) {
            const results = categories.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);


    return (
        <>
            {isAtTop && pathname !== '/chat' && (
                <div className="relative hidden md:flex bg-gray-100 border border-transparent focus-within:border-blue-500 focus-within:bg-transparent px-6 rounded-full h-10 lg:w-2/4 mt-3 mx-auto max-lg:mt-6">
                    <Select
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
                        {citiesInMorocco?.map((city, key) => (
                            <MenuItem key={key} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </Select>


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
                            {searchResults.map((result) => (
                                <Link
                                    key={result.id}
                                    to={`/search/${result.id}`} // Adjust the path according to your routing
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    {result.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Search;