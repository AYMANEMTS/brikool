import * as React from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "./screns/Home";
import Workers from "./screns/Workers";
import Account from "./screns/Account";
import HeaderDrawer from "../components/HeaderDrawer";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator()

function TabScreens(){
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Workers" component={Workers} />
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
    )
}

function index() {
    return (
        <Drawer.Navigator screenOptions={{
            header: (props) => <HeaderDrawer {...props} />
        }}>
            <Drawer.Screen name="Tabs" component={TabScreens} />
        </Drawer.Navigator>
    );
}
export default index
