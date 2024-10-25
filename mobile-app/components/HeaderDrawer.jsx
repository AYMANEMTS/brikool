import React from 'react';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import tw from 'twrnc';
import {Entypo} from "@expo/vector-icons";

const Header = (props) => {
    return (
        <View style={tw`flex flex-row items-center justify-between p-4 bg-white shadow`}>
            {/* Left Logo */}
            <TouchableOpacity>
                <Image
                    source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/330px-Wikipedia-logo-v2.svg.png'}}
                    style={tw`w-10 h-10`}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* Center Search Input */}
            <TextInput readOnly={true}
                placeholder="Search..."
                style={tw`flex-1 h-10 border border-gray-300 rounded-full mx-4 px-4`}
            />

            {/* Right Drawer Button */}
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                <Entypo name="menu" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
