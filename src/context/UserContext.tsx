'use client';
import { Axios, handleAxiosError } from '@/config/axios';
import { ALlUsersResType, User } from '@/types';
import { UserContexType } from '@/types/context';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const UserContext = createContext<UserContexType | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[] | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await Axios.get<ALlUsersResType>('/users');
                setUsers(data.users);
            } catch (error) {
                const err = await handleAxiosError(error);
                toast.error(err);
            }
        })();
    }, []);

    const value = {
        users,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === null) {
        throw new Error('usUser must be used within an UserContextProvider');
    }

    return context;
};

export default UserContextProvider;
