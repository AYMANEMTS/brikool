import React from 'react';
import {Text, View} from "react-native";
import AuthForm from "../../components/auth/AuthForm";
import {useUserContext} from "../../context/UserContext";

function Account() {
    const {user} = useUserContext();
    if (!user) {
        return <AuthForm />;
    }
    return (
        <View>
            <Text>
                Account
            </Text>
        </View>
    );
}

export default Account;