import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";
import { AxiosError } from "axios";
import { io, Socket } from "socket.io-client";

import { useAuth } from "./useAuth";
import { ChatDTO } from '../dtos/Chats';
import { MessagesDTO } from '../dtos/Messages';
import { ApiChat } from '../services/api';

type MessageInfo = { chat_id: string, content: string };

interface IProviderProps {
    children: JSX.Element
}

interface IContextData {
    chats: ChatDTO;
    messages: IMessages[];
    fetchChats: () => void;
    socket: Socket;
    sendMessage: (messageInfo: MessageInfo, user_id: string) => Promise<void>;
}

interface IMessages {
    id: string;
    messages: MessagesDTO
}
const ChatContext = createContext({} as IContextData);

const ChatProvider: React.FC<IProviderProps> = ({ children }) => {
    const { user } = useAuth();
    const [chats, setChats] = useState<ChatDTO>([]);
    const [messages, setMessages] = useState<IMessages[]>([]);
    const [socket, setSocket] = useState<Socket>({} as Socket);

    async function fetchChats() {
        try {
            const { data } = await ApiChat.get<ChatDTO | undefined>('/chats/fetch');
            if (!data) return setChats([]);

            setChats(data);
        } catch (error) {
            const err = error as AxiosError;
            console.log(err.message);
        }
    }

    async function sendMessage(message: MessageInfo, user_id: string) {
        socket.emit("new_message", { user_id, message });
    }

    // async function fetchMessages(chat_id: string) {
    //     console.log('fetching messages.')
    //     console.log(chat_id)
    //     try {
    //         const { data } = await ApiChat.get<MessagesDTO | undefined>(`/messages/fetchMessagesByChat/${chat_id}`);
    //         if (!data) throw new AxiosError('No response returned by request');

    //         const chat = chats.find(chat => chat.id === chat_id);
    //         if (!chat) {
    //             console.log('sem chat')
    //             setMessages(prevMessages => { return [{ id: chat_id, messages: data }, ...prevMessages] })
    //         } else {
    //             console.log('com chat')
    //             setMessages(prevMessages => {
    //                 const messages = prevMessages.map(prevMessage => {
    //                     if (!(prevMessage.id === chat_id)) return prevMessage;
    //                     return { id: prevMessage.id, messages: [...data, ...prevMessage.messages] }
    //                 })

    //                 return messages;
    //             })
    //         }

    //         console.log(messages)
    //     } catch (error) {
    //         const err = error as AxiosError;
    //         console.log(err.message);
    //     }
    // }

    useEffect(() => {
        const connection = io(process.env.API_URL);
        console.log(connection);

        setSocket(connection);

        connection.emit("new_connection", { user_id: user.user.id });

        connection.on("refresh_response", data => {
            console.log("Carregou todos chats para o", user.user.name)
            setChats(data)
        });
        connection.on("message_received", data => {
            console.log("Recebeu mensagem", user.user.name)
            connection.emit("refresh")
        });
    }, [])

    return (
        <ChatContext.Provider value={{ chats, messages, fetchChats, socket, sendMessage }}>
            {children}
        </ChatContext.Provider>
    )
}

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };
