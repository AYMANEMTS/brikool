import * as React from 'react';
import 'react-native-gesture-handler';
import Main from "../layout/Main";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import { RootSiblingParent } from 'react-native-root-siblings';
import { AppState, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from 'expo-device';

import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const queryClient = new QueryClient();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


function Index() {
    const [user, setUser] = useState(null);
    const [expoPushToken, setExpoPushToken] = useState()
    const getUser = async () => {
        const actualUser = await AsyncStorage.getItem('user');
        if (actualUser) setUser(JSON.parse(actualUser));
    };

    useEffect(() => {
        getUser();
    }, []);

    // useEffect(() => {
    //     registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))
    //     console.log("token",expoPushToken)
    // }, []);

    return (
        <PaperProvider>
            <QueryClientProvider client={queryClient}>
                <RootSiblingParent>
                    <Main />
                </RootSiblingParent>
            </QueryClientProvider>
        </PaperProvider>
    );
}

export default Index;


function handleRegistrationError(errorMessage) {
    alert(errorMessage);
    throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            handleRegistrationError('Permission not granted to get push token for push notification!');
            return;
        }
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
            handleRegistrationError('Project ID not found');
        }
        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(pushTokenString);
            return pushTokenString;
        } catch (e) {
            handleRegistrationError(`${e}`);
        }
    } else {
        handleRegistrationError('Must use physical device for push notifications');
    }
}

