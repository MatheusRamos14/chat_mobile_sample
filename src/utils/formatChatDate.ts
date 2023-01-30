import { format } from "date-fns";

import { MessagesDTO } from "../dtos/Messages";

type MessageInfo = {
    content: string;
    sended_at: string;
    author_id: string;
    alreadyRead: boolean;
}

export interface ISection {
    title: string;
    data: MessageInfo[];
}

export function formatChatDate(messages: MessagesDTO) {
    const dates: ISection[] = []

    messages.map(message => {        
        const formattedDate = format(new Date(message.sended_at), 'MMMM dd');
        const messageData: MessageInfo = { content: message.content, sended_at: message.sended_at, author_id: message.author_id, alreadyRead: message.alreadyRead };
        const dateSection = dates.find(value => value.title === formattedDate);

        if (!dateSection) dates.push({ title: formattedDate, data: [messageData] });
        else dateSection.data.push(messageData)
    })

    return dates;
}