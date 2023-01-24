type lastMessage = {
    content: string;
    sended_at: string;
    author_id: string;
}

type connection = {
    users: [{ id: string, name: string; }]
}

export type Chat = {
    id: string;
    connection_id: string;
    createdAt: string;
    messages: lastMessage[];
    connection: connection;
    unread: number;
}

export type ChatDTO = Chat[];