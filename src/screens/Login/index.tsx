import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    ToastAndroid
} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import { AxiosError } from "axios";
import { io } from 'socket.io-client';

import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Login() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await login({ email, password });
        } catch (error) {
            const err = error as AxiosError;
            console.log(err.response?.status)
            if (err.response?.status === 400)
                ToastAndroid.show('Invalid mail address or password', 3000)
            else if (err.response?.status === 404)
                ToastAndroid.show('User inactivated or not found', 3000)
            else
                ToastAndroid.show('Internal server error, try again later', 5000)
        }
    }

    return (
        <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                className="flex-1 items-center justify-center"
                behavior={Platform.OS === 'ios' ? "padding" : undefined}
            >
                <View className="w-full items-center justify-center">
                    <Entypo
                        name="chat"
                        color="blue"
                        size={96}
                        style={{ marginTop: 28 }}
                    />
                    <Text className="font-semibold text-2xl text-text_primary mt-3 mb-10">
                        Welcome to chat_sample
                    </Text>
                </View>

                <View className="w-full px-4 gap-y-4">
                    <Input
                        placeholder="E-mail address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Input
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

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
                    <TouchableOpacity className="bg-transparent self-center mb-4" activeOpacity={0.7}>
                        <Text className="font-semibold text-button_primary text-base">
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}