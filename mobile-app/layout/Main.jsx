import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../app/screns/Home";
import PostJob from "../app/screns/PostJob";
import Account from "../app/screns/Account";
import ContentDrawer from "../components/drawer/ContentDrawer";
import HeaderDrawer from "../components/drawer/HeaderDrawer";
import {Ionicons} from "@expo/vector-icons";
import {AntDesign} from '@expo/vector-icons';
import Notification from "../app/screns/Notification";
import WorkerDetails from "../app/screns/WorkerDetails";
import {useQuery, useQueryClient} from "react-query";
import ClientApi from "../api/ClientApi";
import tw from "twrnc";
import {View,Text} from "react-native";
import {useUserContext} from "../context/UserContext";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator()
const Stack = createStackNavigator();

function TabScreens(){
    const {user} = useUserContext()
    const { data: notifications = [] } = useQuery("notifications", ClientApi.getUserNotifications, {
        select: (data) => data.data,
        enabled: !!user,
        // refetchInterval: 1500,
        // retry: 0,
    });
    const NotificationIconWithBadge = ({ color, size, focused, count }) => (
        <View>
            <Ionicons
                name={focused ? "notifications-sharp" : "notifications-outline"}
                size={size}
                color={color}
            />
            {count > 0 && (
                <View style={[tw`absolute -top-1 -right-2 bg-red-500 rounded-full`, { paddingHorizontal: 4 }]}>
                    <Text style={tw`text-white text-xs font-bold`}>{count}</Text>
                </View>
            )}
        </View>
    );

    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen  name="Home" component={Home} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
                ),
                tabBarLabel: "Home"
            }}/>
            <Tab.Screen name="PostJob" component={PostJob} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <AntDesign name={focused ? "notification" : "notification"} size={size} color={color} />
                ),
                tabBarLabel: "Post Job"
            }}/>
            <Tab.Screen name="Notification" component={Notification} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <NotificationIconWithBadge
                        color={color}
                        size={size}
                        focused={focused}
                        count={notifications.length}
                    />
                ),
                tabBarLabel: "Notification"
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

function MainDrawer() {
    return (
        <Drawer.Navigator drawerContent={(props) => <ContentDrawer {...props} /> }
                          screenOptions={{
                              header: (props) => <HeaderDrawer {...props} />
                          }}>
            <Drawer.Screen name="Tabs" component={TabScreens} />
        </Drawer.Navigator>
    );
}

function Main() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainDrawer"
                component={MainDrawer}
                options={{ headerShown: false }} // Hide header for MainDrawer
            />
            <Stack.Screen
                name="WorkerDetails"
                component={WorkerDetails}
                options={{ header: (props) => <HeaderDrawer {...props} /> }} // Show custom header for WorkerDetails
            />
        </Stack.Navigator>
    );
}
export default Main
