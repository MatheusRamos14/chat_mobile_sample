import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    FlatList
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { styled } from 'nativewind';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { Header } from '../../components/Header';
import { ChatScreenParams } from '../../routes/index.routes';
import { ApiChat } from '../../services/api';
import { ChatCard } from '../../components/ChatCard';

const BorderlessButtonTW = styled(BorderlessButton);

export function ChatsList() {
    const { navigate } = useNavigation();
    const { user } = useAuth();
    const { chats } = useChat();

    function handleNavigate(ChatParams: ChatScreenParams) {
        navigate('Chat', ChatParams)
    }

    return (
        <View className="flex-1 bg-white">
            <Header
                title="Chats"
                leftElement={
                    <View className='w-8 h-8 bg-slate-200 items-center justify-center rounded-full'>

                    </View>
                }
                rightElement={
                    <BorderlessButtonTW>
                        <Feather
                            name="plus"
                            size={24}
                            color="black"
                        />
                    </BorderlessButtonTW>
                }
            />
            <View className='flex-1'>
                <View className='w-full px-5'>
                    <View className='w-full border border-[#B3B3B3] rounded-2xl flex-row items-center justity-between px-4 py-3 my-4'>
                        <TextInput
                            className='flex-1 p-0 text-base font-normal text-black mr-2'
                            placeholder='Search contacts'
                            placeholderTextColor="#666666"
                        />
                        <BorderlessButtonTW>
                            <Feather
                                name="search"
                                color="black"
                                size={24}
                            />
                        </BorderlessButtonTW>
                    </View>
                </View>

                <FlatList
                    data={chats}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ChatCard
                            userId={user.user.id}
                            data={item}
                            handleNavigate={handleNavigate}
                        />
                    )}
                />
            </View>
        </View>
    )
}