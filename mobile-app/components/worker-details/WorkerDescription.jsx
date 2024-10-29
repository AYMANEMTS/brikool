import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const WorkerDescription = ({ description }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    return (
        <View style={tw`mb-4`}>
            <Text
                style={tw`text-base text-gray-700 capitalize`}
                numberOfLines={showFullDescription ? undefined : 4} // Show only 4 lines initially
            >
                {description}
            </Text>
            <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
                <Text style={tw`text-blue-500 mt-2`}>
                    {showFullDescription ? "Show Less" : "Show More"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default WorkerDescription;
