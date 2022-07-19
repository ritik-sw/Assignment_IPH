//BUILT-IN MODULES

import {
    Text,
    View,
    Image,
} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

//SCREENS

import SplashScreen from '../screens/SplashScreen'
import HomeScreen from '../screens/HomeScreen';
import Login from "../screens/Login";
import Register from "../screens/Register";





// MAIN  STACK NAVIGATION

const Stack = createNativeStackNavigator();

const Navigation = () => {

    //ADD LOGIN HERE

    const [initialRouteName, setInitialRouteName] = React.useState("");

    React.useEffect(() => {
        setTimeout(authUser, 3000);
    }, []);

    const authUser = async () => {
        try {
            let userData = await AsyncStorage.getItem("user");
            if (userData) {
                userData = JSON.parse(userData);
                if (userData?.loggedIn) {
                    setInitialRouteName("HomeScreen");
                } else {
                    setInitialRouteName("Login");
                }
            } else {
                setInitialRouteName("Register");
            }
        } catch (error) {
            setInitialRouteName("Register");
        }
    };

    return (
        <NavigationContainer>
            {initialRouteName == '' ? (
                <SplashScreen />
            ) : (
                <>
                    <Stack.Navigator
                        initialRouteName={initialRouteName}
                        screenOptions={{ headerShown: false }}>

                        <Stack.Screen name="HomeScreen" component={HomeScreen} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />

                    </Stack.Navigator>
                </>
            )}
        </NavigationContainer>
    );
};


export default Navigation;