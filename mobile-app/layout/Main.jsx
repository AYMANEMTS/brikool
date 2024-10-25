import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../app/screns/Home";
import Workers from "../app/screns/Workers";
import Account from "../app/screns/Account";
import ContentDrawer from "../components/drawer/ContentDrawer";
import HeaderDrawer from "../components/drawer/HeaderDrawer";
import {Ionicons} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator()

function TabScreens(){
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen  name="Home" component={Home} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
                ),
                tabBarLabel: "Home"
            }}/>
            <Tab.Screen name="Workers" component={Workers} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "people" : "people-outline"} size={size} color={color} />
                ),
                tabBarLabel: "Workers"
            }}/>
            <Tab.Screen name="Account" component={Account} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
                ),
                tabBarLabel: "Account"
            }}/>
        </Tab.Navigator>
    )
}

function Main() {
    return (
        <Drawer.Navigator drawerContent={(props) => <ContentDrawer {...props} /> }
                          screenOptions={{
                              header: (props) => <HeaderDrawer {...props} />
                          }}>
            <Drawer.Screen name="Tabs" component={TabScreens} />
        </Drawer.Navigator>
    );
}
export default Main
