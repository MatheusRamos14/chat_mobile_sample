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
interface IProviderProps {
    children: JSX.Element
}


interface IContextData {
    chats: ChatDTO;
    messages: IMessages[];
    fetchChats: () => void;
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

    async function fetchConnections() {
        
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
        const connection = io("http://10.0.2.2:9015/");

        setSocket(connection);

        connection.emit("new_connection", { user_id: user.user.id });
        // const refreshInterval = setInterval(async () => {
        //     await fetchChats();

        //     // for (let chat of chats) {
        //     //     fetchMessages(chat.id)
        //     // }
        // }, 700);

        // return () => {
        //     clearInterval(refreshInterval);
        // }
    }, [])

    return (
        <ChatContext.Provider value={{ chats, messages, fetchChats }}>
            {children}
        </ChatContext.Provider>
    )
}

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };
