import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import StarRating from 'react-native-star-rating-widget';

const WorkerRatings = ({ ratings }) => {
    // Calculate average rating
    const averageRating = ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
        : 0; // Default to 0 if there are no ratings

    return (
        <View style={tw`p-4`}>
            {/* Rating section */}
            <Text style={tw`text-lg font-bold mb-2`}>Worker Rating</Text>
            <StarRating
                rating={averageRating}
                onChange={() => {}}
                starSize={30}
                enableHalfStar={true}
                color="gold"
                maxStars={5}
            />
            <Text style={tw`text-sm text-gray-600 mt-1`}>
                {ratings.length} {ratings.length === 1 ? 'review' : 'reviews'}
            </Text>
        </View>
    );
};

export default WorkerRatings;
