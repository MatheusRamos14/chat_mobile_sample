import React from 'react';
import {
    View,
    TextInput,
    FlatList
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { styled } from 'nativewind';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';
import { Header } from '../components/Header';
import { ChatCard } from '../components/ChatCard';

const BorderlessButtonTW = styled(BorderlessButton);

type TChatScreenParams = ReactNavigation.AppStackScreenProps<"Chat">;
type Props = ReactNavigation.CompositeProps<"Chats">;

export function ChatsList({ navigation }: Props) {
    const { route } = useNavigation<TChatScreenParams>();
    const { user } = useAuth();
    const { chats, socket } = useChat();

    function handleNavigate(ChatParams: typeof route.params) {
        socket.emit("chat_action", { chat_id: ChatParams.chat_id, action: 'enter' })
        navigation.navigate('Chat', ChatParams)
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