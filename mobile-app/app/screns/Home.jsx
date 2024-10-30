import React, {useEffect, useState} from 'react';
import { FlatList, View } from "react-native";
import tw from "twrnc";
import WorkerCard from "../../components/WorkerCard";
import FilterSection from "../../components/home/FilterSection";

function Home(props) {
    const [filteredWorkers, setFilteredWorkers] = useState([]);
    const {type = null,query = {}} = props.route.params || {}
    const {navigate} = props.navigation
    return (
        <View style={tw`flex-1 p-4 bg-gray-100`}>
            {/* FilterSection */}
            <FilterSection  type={type} data={query} navigate={navigate}
                setFilteredWorkers={setFilteredWorkers} filteredWorkers={filteredWorkers}/>

            {/* WorkersList */}
            <FlatList
                data={filteredWorkers}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => <WorkerCard item={item} navigation={props.navigation} />}
                numColumns={2}
                columnWrapperStyle={tw`justify-between`}
            />
        </View>
    );
}

export default Home;

