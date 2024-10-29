import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import AuthForm from "../../components/auth/AuthForm";
import {useUserContext} from "../../context/UserContext";

function Notification() {
    const {user} = useUserContext();
    if (!user) {
        return <AuthForm />;
    }
    return (
            <>
                <View>
                    <Text>
                        Notification
                    </Text>
                </View>

            </>
    );
}

export default Notification;
