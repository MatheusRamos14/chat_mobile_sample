import axios from 'axios';

import { getToken } from './auth';

const ApiChat = axios.create({
    baseURL: "https://4888-2804-d4b-8914-7e00-512a-2678-e92e-616e.sa.ngrok.io",
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