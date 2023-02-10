import React from 'react';
import {
    FlatList,
    View,
    Text,
} from 'react-native';

import { ISection } from '../utils/formatChatDate';

interface Props {
    messages: ISection[],
    user_id: string;
}

export function MessageScroller({ messages, user_id }: Props) {
    return (
        <FlatList
            className="my-4"
            inverted
            data={messages}
            keyExtractor={(item) => item.title}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: sectionItem }) => (
                <View className="w-full">
                    <View className="w-full items-center justify-center mb-4">
                        <View className="bg-[#F2F2F2] items-center justify-center py-1 px-2 rounded-2xl">
                            <Text className="text-xs text-[#333333]">
                                {sectionItem.title}
                            </Text>
                        </View>
                    </View>
                    <FlatList
                        inverted
                        data={sectionItem.data}
                        keyExtractor={(item) => item.sended_at}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item: messageItem }) => (
                            <View className="w-full">
                                <View
                                    className={`
                                                max-w-[80%] py-3 px-4 mb-4 rounded-xl
                                                ${messageItem.author_id === user_id ? 'self-end' : 'self-start'}
                                                ${messageItem.author_id === user_id ? 'bg-[#3355FF]' : 'bg-[#F2F2F2]'}                                                
                                            `}
                                >
                                    <Text
                                        className={`
                                                    text-base font-normal
                                                    ${messageItem.author_id === user_id ? 'text-[#F2F2F2]' : 'text-[#333333]'}
                                                `}
                                    >
                                        {messageItem.content}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            )}
        />
    );
}