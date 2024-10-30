import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import {useUserContext} from "../../context/UserContext";
import ClientApi from "../../api/ClientApi";
import {useQueryClient} from "react-query";

function WorkerRatings({ worker, refetch, navigation }) {
    const [value, setValue] = useState(null);  // Initially null to avoid empty stars
    const {user} = useUserContext()

    // Initialize the rating value based on job data
    useEffect(() => {
        if (worker && typeof worker.averageRating === 'number') {
            setValue(worker.averageRating);
        } else {
            setValue(0);
        }
    }, [worker]);

    const queryClient = useQueryClient()
    // Submit the rating to the backend
    const submitRating = async (newValue) => {
        try {
            const id = worker._id;
            if (user) {
                const response = await ClientApi.addRating(id, { rating: newValue });
                if (response.status === 200) {
                    await queryClient.invalidateQueries("workers")
                    refetch()
                }
            }
        } catch (err) {
            console.error("Error submitting rating:", err);
        }
    };

    // Handle rating change
    const handleRatingChange = (newValue) => {
        if (worker.userId._id === user?._id) {
            Alert.alert("Unauthorized", "You cannot rate your own listing.");
            return;
        }
        if (!user) {
            Alert.alert("Login Required", "Please log in to submit a rating.", [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Login",
                        onPress: () => navigation.navigate('Account'),
                    }
                ]
            );
            return;
        }
        setValue(newValue);
        submitRating(newValue);
    };

    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <StarRating
                    rating={value || 0}  // Default to 0 to avoid empty stars
                    onChange={(newValue) => {
                        handleRatingChange(newValue)
                    }}
                    starSize={30}
                    enableHalfStar={false}
                    color="gold"
                    maxStars={5}
                />
                {value !== null && (
                    <Text style={{ marginLeft: 10 }}>{value} ({worker?.ratings?.length || 0} reviews)</Text>
                )}
            </View>

        </>
    );
}

export default WorkerRatings;
