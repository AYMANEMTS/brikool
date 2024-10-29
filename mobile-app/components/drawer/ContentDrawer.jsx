import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import tw from 'twrnc';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import ChangeLanguage from "../ChangeLanguage";
import {useUserContext} from "../../context/UserContext";

const ContentDrawer = (props) => {
    const {user,logout} = useUserContext();
    const redirectAuth = () => props.navigation.navigate("Account");
    return (
        <DrawerContentScrollView {...props}>
            <View style={tw`flex-1 p-4 bg-white`}>
                {/* Logo */}
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/330px-Wikipedia-logo-v2.svg.png' }}
                    style={tw`w-20 h-20 mb-4`}
                    resizeMode="contain"
                />

                {/* Welcome Message */}
                <Text style={tw`text-lg font-bold mb-2`}>Welcome to Besma</Text>
                <Text style={tw`text-sm mb-4`}>1er website for independent workers</Text>

                {/* Buttons */}
                {user ? (
                    <>
                        <TouchableOpacity style={tw`bg-green-500 rounded p-2 mb-2`}>
                            <Text style={tw`text-white text-center`}>Post a Job </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={logout}
                            style={tw`bg-red-500 rounded p-2 mb-4`}>
                            <Text style={tw`text-white text-center`}>Logout</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity onPress={redirectAuth}
                            style={tw`bg-blue-500 rounded p-2 mb-3`}>
                            <Text style={tw`text-white text-center`}>Login or create account </Text>
                        </TouchableOpacity>
                    </>
                )}



                {/* Icons */}
                <View style={tw`flex-row justify-around mt-1`}>
                    {user && (
                        <TouchableOpacity style={tw`bg-red-400 p-2 rounded-full`}>
                            <Ionicons name="notifications" size={24} color="black" />
                        </TouchableOpacity>
                    )}
                    {/* dark-mode */}
                    <TouchableOpacity style={tw`bg-red-400 p-2 rounded-full`}>
                        <MaterialIcons name="dark-mode" size={24} color="black" />
                    </TouchableOpacity>
                    {/* translation */}
                    <ChangeLanguage />
                    {/* support */}
                    <TouchableOpacity style={tw`bg-red-400 p-2 rounded-full`}>
                        <MaterialIcons name="support-agent" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </DrawerContentScrollView>
    );
};

export default ContentDrawer;
