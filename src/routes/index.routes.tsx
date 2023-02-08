import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import { ChatProvider } from "../hooks/useChat";
import { useAuth } from "../hooks/useAuth";
import { MainRoutes } from "./main.routes";
import { AuthRoutes } from "./stack.routes";
import { Chat } from '../screens/Chat';

const { Navigator, Screen } = createStackNavigator<ReactNavigation.AppStackParamList>();

export function AppRoutes() {
    const { isLogged } = useAuth();

    return isLogged ? (
        <ChatProvider>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Main" component={MainRoutes} />
                <Screen name="Chat" component={Chat} />
            </Navigator>
        </ChatProvider >
    ) : ( <AuthRoutes /> )
}
