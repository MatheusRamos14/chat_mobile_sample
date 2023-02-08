import React from "react";
import {
    View,
    Text,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { styled } from "nativewind";

import {
    Chat as IChat
} from "../dtos/Chats";

const RectButtonTW = styled(RectButton);

type ChatScreenParams = ReactNavigation.AppStackParamList['Chat']

interface IChatProps {
    data: IChat;
    userId: string;
    handleNavigate: (ChatParams: ChatScreenParams) => void;
}

export function ChatCard({ data, userId, handleNavigate }: IChatProps) {
    const chatParams: ChatScreenParams = {
        chat_id: data.id,
        friend_id: data.connection.users[0].id,
        friend_name: data.connection.users[0].name
    }

    return (
        <RectButtonTW className="w-full" onPress={() => handleNavigate(chatParams)}>
            <View className="w-full flex-row px-4 py-3 border-b border-b-slate-200">
                <View className="w-12 h-12 rounded-full bg-blue-400 mr-2" />
                <View className="flex-1">
                    <Text className="text-base font-normal text-[#333333] mb-1">
                        {data.connection.users[0].name}
                    </Text>
                    {
                        data.messages.length > 0 &&
                        <Text className="text-sm font-normal text-[#666666]">
                            {data.messages[0].author_id === userId && 'You:'}
                            {data.messages[0].content}
                        </Text>
                    }
                </View>
                {data.unread !== 0 &&
                    <View className="w-5 h-5 rounded-full items-center justify-center">
                        <Text>{data.unread}</Text>
                    </View>
                }
            </View>
        </RectButtonTW>
    );
}