import axios from 'axios';

import { getToken } from './auth';

const ApiChat = axios.create({
    baseURL: 'http://10.0.2.2:9015',
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