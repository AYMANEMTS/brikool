import React, {useState} from 'react';
import {Image, TouchableOpacity} from "react-native";
import tw from "twrnc";
import {MaterialIcons} from "@expo/vector-icons";
import {Menu} from "react-native-paper";

function ChangeLanguage() {
    const [menuVisible, setMenuVisible] = useState(false);
    const handleMenuVisible = () => setMenuVisible(!menuVisible)
    return (
        <Menu
            visible={menuVisible}
            onDismiss={handleMenuVisible}
            anchor={
                <TouchableOpacity onPress={handleMenuVisible} style={tw`bg-red-400 p-2 rounded-full`}>
                    <MaterialIcons name="g-translate" size={24} color="black" />
                </TouchableOpacity>
            }
        >
            <Menu.Item
                title="English"
                leadingIcon={() => (
                    <Image
                        source={require('../flags-emoji/us.png')}
                        style={{ width: 24, height: 24, borderRadius: 4 }}
                    />
                )}
            />
            <Menu.Item
                title="Français"
                leadingIcon={() => (
                    <Image
                        source={require('../flags-emoji/fr.png')}
                        style={{ width: 24, height: 24, borderRadius: 4 }}
                    />
                )}
            />
            <Menu.Item
                title="العربية"
                leadingIcon={() => (
                    <Image
                        source={require('../flags-emoji/ma.png')}
                        style={{ width: 24, height: 24, borderRadius: 4 }}
                    />
                )}
            />
        </Menu>
    );
}

export default ChangeLanguage;
