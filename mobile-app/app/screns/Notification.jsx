import React from 'react';
import AuthForm from "../../components/auth/AuthForm";
import {useUserContext} from "../../context/UserContext";
import { useQueryClient} from "react-query";
import tw from "twrnc";
import {View, Text, FlatList, Image, TouchableOpacity} from "react-native";
import displayImage from "../../utils/DisplayImage";
import formatDate from "../../utils/formatDate";
import ClientApi from "../../api/ClientApi";


function Notification({navigation}) {
    const queryClient = useQueryClient()
    const notifications = queryClient.getQueryData("notifications");
    const {user} = useUserContext();
    if (!user) {
        return <AuthForm />;
    }
    const notificationAction = async (notification) => {
        try {
            const notificationsIds = notification.notificationIds
            if (Array.isArray(notificationsIds) && notificationsIds.length > 0) {
                await ClientApi.markAsReadNotification(notificationsIds);
                await queryClient.invalidateQueries("notifications")
            } else {
                console.warn("No valid notification IDs provided.");
            }
            navigation.navigate('WorkerDetails',{jobId:notification.relatedEntityId})
        }catch (e) {
            console.log(e)
        }
    }
    const renderNotification = ({ item }) => (
        <TouchableOpacity onPress={() => notificationAction(item)}
            style={tw`flex flex-row items-center ${!item.read ? 'bg-gray-300' : 'bg-white'} p-4 mb-2 rounded-lg shadow`}>
            <Image
                source={{ uri: displayImage("",item.senderId) }} // Adjust based on your data structure
                style={tw`h-12 w-12 rounded-full mr-4`}
            />
            <View style={tw`flex-1`}>
                <Text style={tw`font-semibold text-lg`}> New {item.type} ({item.count})</Text>
                <Text style={tw`text-gray-600`}>{item.content}</Text>
                <Text style={tw`text-gray-600`}>{formatDate(item.createdAt)}</Text>
            </View>
        </TouchableOpacity>
    );
    const clearAll = async () => {
        try {
            await ClientApi.clearUserNotifications()
            await queryClient.invalidateQueries("notifications")
            navigation.navigate("Notification")
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={tw`flex-1 bg-gray-100 p-4`}>
            <View style={tw`flex-row justify-between mb-2 mx-2`}>
                <Text style={tw`text-lg font-semibold`} >Notifications </Text>
                <TouchableOpacity onPress={clearAll}>
                    <Text style={tw`text-lg font-semibold text-red-500`}>Clear All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={notifications?.data || []}
                renderItem={renderNotification}
                keyExtractor={(item) => item._id}
                contentContainerStyle={tw`pb-20`}
            />
        </View>
    );
}

export default Notification;
