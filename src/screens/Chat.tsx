import React, { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { BorderlessButton, TextInput } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import { AxiosError } from "axios";

import { MessagesDTO, Messages } from "../dtos/Messages";
import { useAuth } from "../hooks/useAuth";
import { ApiChat } from "../services/api";
import { formatChatDate, ISection } from "../utils/formatChatDate";
import { Header } from "../components/Header";
import { useChat } from "../hooks/useChat";
import { MessageScroller } from "../components/MessageScroller";

const BorderlessButtonTW = styled(BorderlessButton);

type Props = ReactNavigation.AppStackScreenProps<"Chat">

export function Chat({ route }: Props) {
	const { goBack } = useNavigation();
	const { params } = route;
	const { chat_id, friend_name } = params;

	const { user } = useAuth();
	const { sendMessage, socket } = useChat();

	const [messages, setMessages] = useState<ISection[]>([]);
	const [newMessage, setNewMessage] = useState<string>();

	async function handleSendMessage() {
		if (newMessage === '' || !newMessage) return;

		sendMessage({ chat_id, content: newMessage }, user.user.id);

		setNewMessage('');
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

	async function readAllMessages() {
		const unreadExists = messages.find(section => {
			const hasUnread = section.data.find(message => message.alreadyRead === false)
			if (hasUnread) return section
			else return null
		})
		if (!unreadExists) return;

		try {
			await ApiChat.patch(`/chats/readAllmessages/${chat_id}`);

			socket.emit("refresh")
		} catch (error) {
			const err = error as AxiosError;
			console.log(err.message);
		}
	}

	// useFocusEffect(useCallback(() => {
	// 	readAllMessages();
	// }, [messages]))

	useFocusEffect(useCallback(() => {
		fetchMessages();

		socket.on("message_received", _ => {
			console.log("Recebeu mensagem em tela", user.user.name)
			socket.emit("chat_message", { chat_id })
		});

		socket.on("chat_message_response", (data: MessagesDTO) => {
			console.log("Recebeu o chat inteiro", user.user.name)

			const format = formatChatDate(data);
			setMessages(format);
		});

		// socket.on("message_received", (data: Messages) => {
		// 	console.log(user.user.id, "message received, overall:", data);

		// 	const formatted = formatChatDate([data]);

		// 	const allMessages = messages.map(section => {										
		// 		if (section.title === formatted[0].title) {
		// 			console.log("achei igual", section.title, formatted[0].title)
		// 			section.data.push(...formatted[0].data)
		// 		}

		// 		return section;
		// 	})

		// 	setMessages(allMessages);
		// })

		return () => {
			socket.emit("chat_action", { chat_id, action: "leave" })
		}
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

				<MessageScroller
					messages={messages}
					user_id={user.user.id}
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