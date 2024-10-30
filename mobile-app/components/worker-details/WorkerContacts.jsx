import React from 'react';
import { TouchableOpacity, View, Alert } from 'react-native';
import tw from 'twrnc';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';

function WorkerContacts({ contacts }) {
    const handlePhonePress = () => {
        Alert.alert(
            "Contact Number",
            contacts.appel,
            [
                {
                    text: "Copy",
                    onPress: () => Clipboard.setStringAsync(contacts.appel),
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ]
        );
    };

    const handleWhatsAppPress = () => {
        const whatsappUrl = `https://wa.me/${contacts.whatssap.replace(/^0/,"")}`;
        Linking.openURL(whatsappUrl).catch(() => {
            Alert.alert("Error", "Unable to open WhatsApp.");
        });
    };

    const handleLinkedInPress = () => {
        Linking.openURL(contacts.linkedin).catch(() => {
            Alert.alert("Error", "Unable to open LinkedIn.");
        });
    };

    return (
        <View style={tw`flex-row justify-around my-4`}>
            {/* Phone */}
            {contacts.appel && (
                <TouchableOpacity onPress={handlePhonePress} style={tw`bg-blue-400 p-3 rounded-xl`}>
                    <Entypo name="phone" size={30} color="black" />
                </TouchableOpacity>
            )}
            {/* WhatsApp */}
            {contacts.whatssap && (
                <TouchableOpacity onPress={handleWhatsAppPress} style={tw`bg-blue-400 p-3 rounded-xl`}>
                    <FontAwesome5 name="whatsapp" size={30} color="black" />
                </TouchableOpacity>
            )}
            {/* LinkedIn */}
            {contacts.linkedin && (
                <TouchableOpacity onPress={handleLinkedInPress} style={tw`bg-blue-400 p-3 rounded-xl`}>
                    <FontAwesome5 name="linkedin" size={30} color="black" />
                </TouchableOpacity>
            )}
            {/* Share */}
            <TouchableOpacity style={tw`bg-blue-400 p-3 rounded-xl`}>
                <FontAwesome5 name="share" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
}

export default WorkerContacts;
