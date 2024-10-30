import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text, Keyboard } from 'react-native';
import tw from 'twrnc';
import { Entypo } from '@expo/vector-icons';
import { useQuery } from 'react-query';
import ClientApi from '../../api/ClientApi';
import {useUserContext} from "../../context/UserContext";

const HeaderDrawer = (props) => {
    const [searchText, setSearchText] = useState('');
    const [userResults, setUserResults] = useState([]);
    const [categoryResults, setCategoryResults] = useState([]);
    const { data: workers = [] } = useQuery('workers', ClientApi.getWorkers, { select: (data) => data.data });
    const { data: categories = [] } = useQuery('categories', ClientApi.getCategories, { select: (data) => data.data.category });
    const {setSearchPreview} = useUserContext()
    useEffect(() => {
        setSearchText('');
    }, []);
    const [oldSearchText, setOldSearchText] = useState("Search")
    useEffect(() => {
        if (searchText) {
            const filteredCategories = categories.filter(category =>
                category.name.toLowerCase().includes(searchText.toLowerCase())
            );
            const filteredUsers = [
                ...new Map(workers
                    .filter(worker => worker.userId.name.toLowerCase().includes(searchText.toLowerCase()))
                    .map(worker => [worker.userId._id, worker])
                ).values()
            ];
            setCategoryResults(filteredCategories);
            setUserResults(filteredUsers);
        } else {
            setUserResults([]);
            setCategoryResults([]);
        }
    }, [searchText]);

    useEffect(() => {
        if (userResults.length > 0 || categoryResults.length > 0){
            setSearchPreview(true)
        }
    }, [userResults,categoryResults]);

    const searchAction = (type,query) => {
        setOldSearchText(searchText)
        setSearchText("")
        setSearchPreview(false)
        setUserResults([])
        setCategoryResults([])
        props.navigation.navigate("Home", {type, query} );
    };

    return (
        <View>
            {/* Header */}
            <View style={tw`flex flex-row items-center justify-between p-4 bg-white shadow`}>
                <TouchableOpacity>
                    <Image
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/330px-Wikipedia-logo-v2.svg.png' }}
                        style={tw`w-10 h-10`}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder={oldSearchText}
                    style={tw`flex-1 h-10 border border-gray-300 rounded-full mx-4 px-4`}
                />
                {props.route.name === 'WorkerDetails' ? (
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Entypo name="back" size={30} color="black" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                        <Entypo name="menu" size={30} color="black" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Dropdown List for Search Suggestions */}
            {Keyboard.isVisible() && (userResults.length > 0 || categoryResults.length > 0) && (
                <View style={tw`absolute w-10/12 bg-white shadow-lg mt-16 px-4 py-2 rounded-b-lg ml-7 `}>
                    {/* Section for Users */}
                    {userResults.length > 0 && (
                        <>
                            <Text style={tw`text-lg font-bold text-gray-800`}>Workers</Text>
                            {userResults.map((result, key) => (
                                <TouchableOpacity
                                    key={`user-${key}`}
                                    onPress={() => {
                                        setSearchText(result.userId.name);
                                        Keyboard.dismiss();
                                        searchAction("user",result.userId);
                                    }}
                                >
                                    <Text style={tw`p-2 text-gray-700`}>{result.userId.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </>
                    )}

                    {/* Section for Categories */}
                    {categoryResults.length > 0 && (
                        <>
                            <Text style={tw`text-lg font-bold text-gray-800 mt-4`}>Categories</Text>
                            {categoryResults.map((result, key) => (
                                <TouchableOpacity
                                    key={`category-${key}`}
                                    onPress={() => {
                                        setSearchText(result.name);
                                        Keyboard.dismiss();
                                        searchAction("category",result);
                                    }}
                                >
                                    <Text style={tw`p-2 text-gray-700`}>{result.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </>
                    )}
                </View>
            )}
        </View>
    );
};

export default HeaderDrawer;
