import axios from 'axios';

import { getToken } from './auth';

const ApiChat = axios.create({
    baseURL: process.env.API_URL,
    timeout: 50000
});

ApiChat.interceptors.request.use(async (config) => {
    const token = await getToken(process.env.TOKEN_STORAGE_KEY as string);

    if (token) {
        const configHeaders = config.headers as any;
        configHeaders['Authorization'] = `Bearer ${token}`;
    }

    return config;
})

export { ApiChat };