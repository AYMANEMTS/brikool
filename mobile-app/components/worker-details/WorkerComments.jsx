import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import displayImage from "../../utils/DisplayImage";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import formatDate from "../../utils/formatDate";

function WorkerComments({ comments }) {
    const [visibleCount, setVisibleCount] = useState(4);

    // Function to show more comments
    const showMoreComments = () => {
        setVisibleCount((prev) => prev + 4);
    };

    // Function to show less comments
    const showLessComments = () => {
        setVisibleCount(4);
    };

    return (
        <>
            <Text style={tw`font-semibold text-xl mb-2 p-2`}>Comments</Text>
            {comments.slice(0, visibleCount).map((item, key) => (
                <View key={key} style={tw`flex-row border border-gray-200 rounded-lg p-3 mb-3 items-center`}>
                    {/* User Image */}
                    <Image
                        source={{ uri: displayImage("", item.userId) }}
                        style={tw`w-12 h-12 rounded-full mr-3`}
                    />
                    <View style={tw`flex-1`}>
                        <Text style={tw`text-sm font-bold capitalize`}>{item.userId.name}</Text>
                        <Text numberOfLines={4} style={tw`text-sm text-gray-600`}>{item.comment}</Text>
                        <Text style={tw`text-xs text-gray-400`}>{formatDate(item.createdAt)}</Text>
                    </View>
                </View>
            ))}
            {visibleCount < comments.length && (
                <TouchableOpacity onPress={showMoreComments} style={tw``}>
                    <Text style={tw`text-blue-500 text-sm`}>
                        Show More
                    </Text>
                </TouchableOpacity>
            )}
            {visibleCount >= comments.length && comments.length > 4 && (
                <TouchableOpacity onPress={showLessComments} style={tw``}>
                    <Text style={tw`text-blue-500 text-sm`}>
                        Show Less
                    </Text>
                </TouchableOpacity>
            )}
            <View style={tw`flex-row items-center`}>
                <TextInput
                    label="Add Comment"
                    mode="outlined"
                    value={""} // Manage input value
                    onChangeText={() => {}} // Manage input value
                    style={tw`flex-1 h-10 mr-2`}
                />
                <TouchableOpacity onPress={() => {}}>
                    <Ionicons name="send" size={30} color="blue" />
                </TouchableOpacity>
            </View>
        </>
    );
}

export default WorkerComments;
