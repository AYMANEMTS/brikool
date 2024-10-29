import React from 'react';
import {TouchableOpacity, View} from "react-native";
import tw from "twrnc";
import {Entypo, FontAwesome5} from "@expo/vector-icons";

function WorkerContacts({contacts}) {
    return (
        <View style={tw`flex-row justify-around my-4`}>
            {/* phone */}
            {contacts.phone !== '' && (
                <TouchableOpacity style={tw`bg-blue-400 p-3 rounded-xl `}>
                    <Entypo name="phone" size={30} color="black" />
                </TouchableOpacity>
            )}
            {/* WhatsApp */}
            {contacts.whatssap !== '' && (
                <TouchableOpacity style={tw`bg-blue-400 p-3 rounded-xl `}>
                    <FontAwesome5 name="whatsapp" size={30} color="black" />
                </TouchableOpacity>
            )}
            {/* LinkedIn */}
            {contacts.linkedin !== '' && (
                <TouchableOpacity style={tw`bg-blue-400 p-3 rounded-xl`}>
                    <FontAwesome5 name="linkedin" size={30} color="black" />
                </TouchableOpacity>
            )}
            {/* share */}
            <TouchableOpacity style={tw`bg-blue-400 p-3 rounded-xl `}>
                <FontAwesome5 name="share" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
}

export default WorkerContacts;
