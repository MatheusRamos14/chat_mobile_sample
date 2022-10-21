import axios from 'axios';

import { getToken } from './auth';

const ApiChat = axios.create({
    baseURL: 'http://192.168.101.28:9015',
    timeout: 50000
});

ApiChat.interceptors.request.use(async (config) => {
    const token = await getToken(process.env.TOKEN_STORAGE_KEY as string);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export { ApiChat };