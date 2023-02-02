import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens/Login';

const { Navigator, Screen } = createStackNavigator<ReactNavigation.AuthStackParamList>();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Login" component={Login} />
        </Navigator>
    )
}
