import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Bottombar from "./components/Bottombar";
import Dashboard from "./home/Dashboard";
import Tables from "./home/Tables";
import Akun from "./home/Akun";


const Tab = createBottomTabNavigator();
const Base = () => {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={props => <Bottombar {...props} />}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Tables" component={Tables} />
            <Tab.Screen name="Akun" component={Akun} />
        </Tab.Navigator>
    )
}

export default Base