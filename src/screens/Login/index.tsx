import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard
} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import { AxiosError } from "axios";

import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Login() {
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            await login();
        } catch (error) {
            const err = error as AxiosError;
                        
        }
    }

    return (
        <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView className="flex-1 items-center justify-center">
                <View className="w-full items-center justify-center">
                    <Entypo
                        name="chat"
                        color="blue"
                        size={96}
                    />
                    <Text className="font-semibold text-2xl text-text_primary mt-6 mb-16">
                        Welcome to chat_sample
                    </Text>
                </View>

                <View className="w-full px-4 gap-y-4">
                    <Input placeholder="E-mail address" />

                    <Input placeholder="Password" />

                    <View className="w-full rounded-xl overflow-hidden">
                        <Button
                            title="Login"
                            onPress={handleLogin}
                        />
                    </View>

                    <View className="w-full rounded-xl overflow-hidden">
                        <Button textClassName="w-full bg-button_secondary items-center py-3">
                            <Text className="font-semibold text-text_primary text-base">
                                Create a new account
                            </Text>
                        </Button>
                    </View>

                    <TouchableOpacity className="bg-transparent self-center" activeOpacity={0.7}>
                        <Text className="font-semibold text-button_primary text-base">
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}