import React, {useState} from 'react';
import {Text, View} from "react-native";
import AuthForm from "../../components/auth/AuthForm";
import Protected from "../../utils/Protected";
import {useUserContext} from "../../context/UserContext";

function PostJob() {
    const {user} = useUserContext();
    if (!user) {
        return <AuthForm />;
    }
    return (
            <View>
                <Text>
                    Workers
                </Text>
            </View>
    );
}

export default PostJob;
