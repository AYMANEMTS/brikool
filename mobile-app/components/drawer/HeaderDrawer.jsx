import React, {useEffect, useState} from 'react';
import {View, TextInput, TouchableOpacity, Image, FlatList, Text, Keyboard} from 'react-native';
import tw from 'twrnc';
import { Entypo } from '@expo/vector-icons';

const HeaderDrawer = (props) => {
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    // Example data for the dropdown list
    const searchSuggestions = [
        { name: "search 1" },
        { name: "search 1" },
        { name: "search 1" },
        { name: "search 1" },
        { name: "search 1" },
        { name: "didi" },
        { name: "cnxx" },
        { name: "alah o akbar" },
    ];

    useEffect(() => {
        if (searchText) {
            const result = searchSuggestions.filter((item) =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setSearchResult(result);
        } else {
            setSearchResult([]);
        }
    }, [searchText]);

    return (
        <View>
            {/* Header */}
            <View style={tw`flex flex-row items-center justify-between p-4 bg-white shadow`}>
                {/* Left Logo */}
                <TouchableOpacity>
                    <Image
                        source={{
                            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/330px-Wikipedia-logo-v2.svg.png'
                        }}
                        style={tw`w-10 h-10`}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                {/* Center Search Input */}
                <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Search..."
                    style={tw`flex-1 h-10 border border-gray-300 rounded-full mx-4 px-4`}

                />

                {/* Right Drawer Button */}
                <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                    <Entypo name="menu" size={30} color="black" />
                </TouchableOpacity>
            </View>

            {/* Dropdown List for Search Suggestions */}
            {Keyboard.isVisible() && searchResult.length > 0 && (
                <View style={tw`absolute w-10/12 bg-white shadow-lg mt-16 px-4 py-2 rounded-b-lg ml-7`}>
                    <FlatList
                        data={searchResult.slice(0,7)}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                setSearchText(item.name);
                                Keyboard.dismiss()
                            }}>
                                <Text style={tw`p-2 text-gray-700`}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export default HeaderDrawer;
