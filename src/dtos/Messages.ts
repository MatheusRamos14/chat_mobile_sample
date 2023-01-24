export type Messages = {
    id: string;
    chat_id: string;
    author_id: string;
    content: string;
    alreadyRead: boolean;
    sended_at: string;
}

export type MessagesDTO = Messages[];