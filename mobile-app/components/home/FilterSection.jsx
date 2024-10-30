import React, {useEffect, useState} from 'react';
import tw from "twrnc";
import {Picker} from "@react-native-picker/picker";
import cities from "../../utils/citiesInMorocco";
import {Text, TouchableOpacity, View} from "react-native";
import {useQuery} from "react-query";
import ClientApi from "../../api/ClientApi";
import {useUserContext} from "../../context/UserContext";

function FilterSection({setFilteredWorkers,filteredWorkers,type,data,navigate}) {
    const [selectedCategory, setSelectedCategory] = useState('AllCategories');
    const [selectedCity, setSelectedCity] = useState('AllCity');
    const { data: workers = [] } = useQuery('workers', ClientApi.getWorkers, { select: (data) => data.data });
    const { data: categories = [] } = useQuery('categories', ClientApi.getCategories, { select: (data) => data.data.category });
    const {searchPreview} = useUserContext()

    useEffect(() => {
        let newWorkers = workers;
        if (selectedCategory !== 'AllCategories') {
            newWorkers = newWorkers.filter(worker => worker.category._id === selectedCategory);
        }
        if (selectedCity !== 'AllCity') {
            newWorkers = newWorkers.filter(worker => worker.userId.city === selectedCity);
        }
        if (type === 'user' && data){
            newWorkers = workers.filter(worker => worker.userId._id === data._id)
        }

        if (JSON.stringify(newWorkers) !== JSON.stringify(filteredWorkers)) {
            setFilteredWorkers(newWorkers);
        }
    }, [selectedCategory, selectedCity,type, data, workers]);
    useEffect(() => {
        if (type === 'category' && data?._id) {
            setSelectedCategory(data._id);
        }
    }, [type, data, workers]);

    return (
        <>
            <View style={tw`flex-row justify-between mb-4 mx-2`}>
                {/* City Filter */}
                <Picker enabled={!searchPreview}
                        selectedValue={selectedCity}
                        onValueChange={(value) => setSelectedCity(value)}
                        style={tw`flex-1 bg-white mr-2 rounded-lg`}
                >
                    <Picker.Item label="All Cities" value="AllCity" />
                    {cities
                        .filter(city => workers.some(worker => worker.userId.city === city))
                        .map((city, key) => (
                            <Picker.Item key={key} label={city} value={city} />
                        ))}
                </Picker>

                {/* Category Filter */}
                <Picker enabled={!searchPreview}
                        selectedValue={selectedCategory}
                        onValueChange={(value) => setSelectedCategory(value)}
                        style={tw`flex-1 bg-white rounded-lg`}
                >
                    <Picker.Item label="All Categories" value="AllCategories" />
                    {categories
                        ?.filter(cate => workers.some(worker => worker.category._id === cate._id))
                        ?.map((category, key) => (
                            <Picker.Item key={key} label={category?.name} value={category?._id} />
                        ))}
                </Picker>
            </View>
            {type === 'user' && (
                <View style={tw`flex mb-4 mx-2`}>
                    <TouchableOpacity onPress={() => {
                        navigate("Home")
                    }}
                                      style={tw`bg-white p-2 rounded-lg flex items-center justify-center`}>
                        <Text style={tw`text-center text-lg text-gray-800`}>All Workers</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
}

export default FilterSection;
