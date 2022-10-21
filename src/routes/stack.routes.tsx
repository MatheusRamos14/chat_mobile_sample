import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens/Login';

type AuthStackParamList = {
    Login: undefined
};

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Login" component={Login} />
        </Navigator>
    )
}
