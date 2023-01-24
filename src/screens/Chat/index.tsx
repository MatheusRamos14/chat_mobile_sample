import React, { useCallback, useState } from "react";
import { Button, FlatList, SectionList, Text, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { BorderlessButton, TextInput } from "react-native-gesture-handler";
import { useRoute, useFocusEffect, useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import { AxiosError } from "axios";

import { ChatScreenParams } from "../../routes/index.routes";
import { MessagesDTO } from "../../dtos/Messages";
import { useAuth } from "../../hooks/useAuth";
import { ApiChat } from "../../services/api";
import { formatChatDate, ISection } from "../../utils/formatChatDate";
import { Header } from "../../components/Header";

const BorderlessButtonTW = styled(BorderlessButton);

export function Chat() {
	const { goBack } = useNavigation();
	const { params } = useRoute();
	const { chat_id, friend_id, friend_name } = params as ChatScreenParams;

	const { user } = useAuth();

	const [messages, setMessages] = useState<ISection[]>([]);
	const [newMessage, setNewMessage] = useState<string>();	

	async function handleSendMessage() {
		if (newMessage === '') return;
		setNewMessage('');

		try {
			const { data } = await ApiChat.post('/messages/send', {
				chat_id,
				content: newMessage
			})

			console.log(data);
			fetchMessages();
		} catch (error) {
			const err = error as AxiosError;
			console.log(err.message)
		}
	}

	async function fetchMessages() {
		try {
			const { data } = await ApiChat.get<MessagesDTO | undefined>(`/messages/fetchMessagesByChat/${chat_id}`)
			if (!data) throw new AxiosError("Unknown error while fetching messages, try again later")

			const format = formatChatDate(data);
			setMessages(format)
		} catch (error) {
			const err = error as AxiosError;
			console.log(err.message)
		}
	}

	useFocusEffect(useCallback(() => {
		fetchMessages();
		// const refreshInterval = setInterval(fetchMessages, 5000);

		// return () => {
		//     clearInterval(refreshInterval);
		// }
	}, []))

	return (
		<View className="flex-1 bg-white">
			<Header
				title={friend_name}
				rightElement={
					<BorderlessButtonTW>
						<Feather
							name="more-horizontal"
							color="black"
							size={24}
						/>
					</BorderlessButtonTW>
				}
				leftElement={
					<View className="flex-row items-center mr-[-32]">
						<BorderlessButtonTW className="mr-2" onPress={goBack}>
							<Feather
								name="chevron-left"
								color="black"
								size={24}
							/>
						</BorderlessButtonTW>
						<View
							className="w-8 h-8 bg-blue-400 rounded-full"
						/>
					</View>
				}
			/>
			<View className="flex-1 px-4">
				<FlatList
					className="my-4"
					inverted
					data={messages}
					keyExtractor={(item) => item.title}
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
								renderItem={({ item: messageItem }) => (
									<View className="w-full">
										<View
											className={`
                                                max-w-[80%] py-3 px-4 mb-4 rounded-xl
                                                ${messageItem.author_id === user.user.id ? 'self-end' : 'self-start'}
                                                ${messageItem.author_id === user.user.id ? 'bg-[#3355FF]' : 'bg-[#F2F2F2]'}                                                
                                            `}
										>
											<Text
												className={`
                                                    text-base font-normal
                                                    ${messageItem.author_id === user.user.id ? 'text-[#F2F2F2]' : 'text-[#333333]'}
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
				<View className="w-full h-12 flex-row items-center mb-1">
					<View className="w-8 h-8 rounded-2xl bg-[#3355FF] items-center justify-center">
						<BorderlessButtonTW
							className="items-center justify-center"
							rippleRadius={28}
						>
							<Feather
								name="plus"
								color="white"
								size={24}
							/>
						</BorderlessButtonTW>
					</View>
					<TextInput
						className={`
							flex-1 py-3 px-4 border border-[#B3B3B3] rounded-xl mx-4
							font-normal text-base text-[#666666]
                        `}
						placeholder="Start typing..."
						placeholderTextColor="#666666"
						onChangeText={setNewMessage}
						value={newMessage}
					/>

					<View className="w-8 h-8 items-center justify-center">
						<BorderlessButtonTW
							className="items-center justify-center"
							rippleRadius={20}
							onPress={handleSendMessage}
						>
							<Feather
								name="send"
								color="black"
								size={24}
							/>
						</BorderlessButtonTW>
					</View>
				</View>
			</View>
		</View>
	)
}