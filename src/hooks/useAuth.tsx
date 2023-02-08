import React, { createContext, useContext, useState } from "react";

import { ApiChat } from "../services/api";
import { storeToken } from "../services/auth";
import { UserDTO } from '../dtos/User';

interface IProviderProps {
    children: JSX.Element[]
}

type User = {
    user: UserDTO,
    token: string;
}

interface IContextData {
    user: User;
    login: ({}: ILoginData) => Promise<void>;
    isLogged: boolean;
}

interface ILoginData {
    email: string;
    password: string;
}

const AuthContext = createContext({} as IContextData);

const AuthProvider: React.FC<IProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>({} as User);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    const login = async (loginData: ILoginData) => {
        console.log('LOGIN')

        const { data } = await ApiChat.post<User>('/session/login', loginData);
        
        await storeToken(process.env.TOKEN_STORAGE_KEY as string, data.token);
        console.log(data);
        setUser(data);
        setIsLogged(true);
    }

    return (
        <AuthContext.Provider value={{ user, login, isLogged }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
