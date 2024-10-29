import React, { useState } from 'react';
import { FlatList, View } from "react-native";
import ClientApi from "../../api/ClientApi";
import { useQuery } from "react-query";
import tw from "twrnc";
import WorkerCard from "../../components/WorkerCard";
import {Picker} from '@react-native-picker/picker';
import cities from '../../utils/citiesInMorocco'
function Home(props) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const { data: workers = [] } = useQuery('workers', ClientApi.getWorkers, { select: (data) => data.data });
    const {data: categories = []} = useQuery('categories',ClientApi.getCategories,{ select: (data) => data.data.category })
    return (
        <View style={tw`flex-1 p-4 bg-gray-100`}>
            {/* Filter Dropdowns */}
            <View style={tw`flex-row justify-between mb-4 mx-2`}>
                {/* City Filter */}
                <Picker selectedValue={selectedCity}
                    onValueChange={(value) => setSelectedCity(value)}
                    style={tw`flex-1 bg-white mr-2`}>
                    <Picker.Item label="All Cities" value={"All Cities"} />
                    {cities?.map((city,key) => (
                        <Picker.Item key={key} label={city} value={city} />
                    ))}
                </Picker>

                {/* Category Filter */}
                <Picker selectedValue={selectedCategory}
                        onValueChange={(value) => setSelectedCategory(value)}
                        style={tw`flex-1 bg-white`}>
                    <Picker.Item label="All Categories" value="" />
                    {categories?.map((category,key) => (
                        <Picker.Item key={key} label={category?.name} value={category?._id} />
                    ))}
                </Picker>
            </View>

            {/* Worker List */}
            <FlatList
                data={workers}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => <WorkerCard item={item} navigation={props.navigation} />}
                numColumns={2} // Display 2 cards per row
                columnWrapperStyle={tw`justify-between`} // Space between cards
            />
        </View>
    );
}

export default Home;
