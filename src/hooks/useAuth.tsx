import React, { createContext, useContext, useState } from "react";

import { ApiChat } from "../services/api";
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
    login: () => Promise<void>;
    isLogged: boolean;
}

const AuthContext = createContext({} as IContextData);

const AuthProvider: React.FC<IProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>({} as User);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    const login = async () => {
        console.log('LOGIN')

        const { data } = await ApiChat.post<User>('/session/login', {
            email: 'mramos@mail.co',
            password: 'mramos123'
        })
        
        setUser(data);
    }

    return (
        <AuthContext.Provider value={{ user, login, isLogged }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
