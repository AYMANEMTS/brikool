import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import displayImage from "../../utils/DisplayImage";
import WorkerDescription from "../../components/worker-details/WorkerDescription";
import WorkerContacts from "../../components/worker-details/WorkerContacts";
import WorkerRatings from "../../components/worker-details/WorkerRatings";
import WorkerComments from "../../components/worker-details/WorkerComments";
import { useQuery } from "react-query";
import ClientApi from "../../api/ClientApi";

function WorkerDetails({ route, navigation }) {
    const { jobId } = route.params;

    // Validate jobId and navigate back if missing
    useEffect(() => {
        if (!jobId) {
            navigation.goBack();
        }
    }, [jobId, navigation]);

    // Fetch worker details
    const { data: worker = {}, isError, isLoading, refetch } = useQuery(
        ["job", jobId],
        () => ClientApi.getWorker(jobId),
        {
            enabled: !!jobId,  // only run query if jobId exists
            select: (data) => data?.data?.job,
        }
    );

    // Handle loading and error states
    if (isLoading) return <Text style={tw`text-center mt-10`}>Loading...</Text>;
    if (isError) return <Text style={tw`text-center mt-10 text-red-500`}>Failed to load worker details</Text>;

    return (
        <ScrollView style={tw`flex-1 bg-white`}>
            <View style={tw`p-4`}>
                {/* Worker Image */}
                <Image
                    source={{ uri: displayImage("", worker?.userId) }}
                    style={tw`w-full h-60 rounded-lg mb-4`}
                />

                {/* Worker Title and Info */}
                <Text style={tw`text-2xl font-bold mb-1 capitalize`}>{worker?.userId?.name || "No name provided"}</Text>
                <Text style={tw`text-lg text-gray-500 mb-2 capitalize`}>
                    {worker?.category?.name || "No category"} • {worker?.userId?.city || "No city"}
                </Text>

                {/* Bio */}
                <WorkerDescription description={worker?.description || "No description available"} />

                {/* Reviews */}
                <WorkerRatings worker={worker} refetch={refetch} navigation={navigation} />

                {/* Contacts */}
                <WorkerContacts contacts={worker?.contacts || {}} />

                {/* Comments */}
                <WorkerComments jobId={jobId} comments={worker?.comments || []} refetch={refetch} navigation={navigation} />
            </View>
        </ScrollView>
    );
}

export default WorkerDetails;
