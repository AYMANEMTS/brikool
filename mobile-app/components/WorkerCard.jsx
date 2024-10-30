import React from 'react';
import tw from "twrnc";
import {Image, Text, TouchableOpacity} from "react-native";
import DisplayImage from "../utils/DisplayImage";

function WorkerCard({item,navigation}) {
    const averageRating =
        item.ratings && item.ratings.length > 0
            ? (item.ratings.reduce((sum, rating) => sum + rating.rating, 0) / item.ratings.length).toFixed(1)
            : "0";
    return (
        <TouchableOpacity style={tw`bg-white shadow-lg rounded-lg m-2 p-4 flex-1`}
        onPress={() => navigation.navigate("WorkerDetails",{jobId:item._id})}>
            {/* Worker Image */}
            <Image
                source={{ uri: DisplayImage("", item.userId) }}
                style={tw`w-full h-32 rounded-lg mb-2`}
                resizeMode="cover"
            />

            {/* Worker Info */}
            <Text style={tw`font-semibold text-lg mb-1`}>{item?.userId?.name}</Text>

            {/* City and Category */}
            <Text style={tw`text-gray-600`} numberOfLines={1} ellipsizeMode="tail">
                {item?.userId?.city}
            </Text>
            <Text style={tw`text-gray-500`} numberOfLines={1} ellipsizeMode="tail">
                {item?.category?.name}
            </Text>

            {/* Bio */}
            <Text style={tw`text-gray-700 mt-1`} numberOfLines={3} ellipsizeMode="tail">
                lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            </Text>

            {/* Reviews and Date */}
            <Text style={tw`text-yellow-500 mt-1`}>⭐ {averageRating} Reviews</Text>
            <Text style={tw`text-gray-400 text-sm mt-1`}>
                {new Date(item?.createdAt).toLocaleDateString()}
            </Text>
        </TouchableOpacity>
    );
}

export default WorkerCard;
