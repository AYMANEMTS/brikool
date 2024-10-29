import React from 'react';
import {View, Text, Image, ScrollView, FlatList} from 'react-native';
import tw from 'twrnc';
import displayImage from "../../utils/DisplayImage";
import WorkerDescription from "../../components/worker-details/WorkerDescription";
import WorkerContacts from "../../components/worker-details/WorkerContacts";
import WorkerRatings from "../../components/worker-details/WorkerRatings";
import WorkerComments from "../../components/worker-details/WorkerComments";

function WorkerDetails({route,navigation}) {
    const {worker} = route.params
    if (!worker){
        navigation.goBack()
    }

    return (
        <ScrollView>
            <View style={tw`flex-1 bg-white p-4`}>
                {/* Worker Image */}
                <Image
                    source={{ uri: displayImage("",worker.userId) }}
                    style={tw`w-full h-60 rounded-lg mb-4`}
                />

                {/* Worker Title and Info */}
                <Text style={tw`text-2xl font-bold mb-1 capitalize`}>{worker.userId.name}</Text>
                <Text style={tw`text-lg text-gray-500 mb-2 capitalize`}>{worker.category.name} • {worker.userId.city}</Text>

                {/* Bio */}
                <WorkerDescription description={worker.description} />

                {/* Reviews */}
                <WorkerRatings ratings={worker.ratings} />

                {/* Contacts */}
                <WorkerContacts contacts />

                {/* Comments */}
                <WorkerComments comments={worker.comments} />

            </View>
        </ScrollView>

    );
}

export default WorkerDetails;
