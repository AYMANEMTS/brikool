import React, { useState } from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper'
import tw from 'twrnc';
import { useUserContext } from "../../context/UserContext";
import AuthForm from "../../components/auth/AuthForm";
import UpdateInformation from "../../components/account/UpdateInformation";
import ChangePassword from "../../components/account/ChangePassword";

function Account() {
    const { user } = useUserContext();


    if (!user) {
        console.log(user)
        return <AuthForm />;
    }

    return (
        <ScrollView>
            <View style={tw`p-4`}>
                {/* Update Information Section */}
                <UpdateInformation />

                {/* Change Password Section */}
                <ChangePassword />

                {/* Account Settings Section */}
                <View>
                    <Text style={tw`text-lg font-bold mb-4`}>Account Settings</Text>
                    <Text style={tw`text-gray-600`}>Additional account settings will be available here.</Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default Account;
