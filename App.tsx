import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from "./src/hooks/useAuth";
import { AppRoutes } from "./src/routes/index.routes";

export function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <AuthProvider>
                    <StatusBar
                        barStyle="dark-content"
                        translucent
                        backgroundColor="transparent"
                    />
                    <AppRoutes />
                </AuthProvider>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}