'use client';
import { Axios, handleAxiosError } from '@/config/axios';
import { ALlUsersResType, ResUser, User } from '@/types';
import { UserContexType } from '@/types/context';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const UserContext = createContext<UserContexType | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [users, setUsers] = useState<ResUser[] | null>(null);

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

    const getALlUser = async () => {
        setIsLoading(true);
        try {
            const { data } = await Axios.get<ALlUsersResType>('/users');
            setUsers(data.users);
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const createUser = async (userData: User) => {
        setIsLoading(true);
        setIsError(false);
        try {
            await Axios.post('/users/create', userData);
            toast.success('User created');
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = async (userData: User, userId: string) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const { data } = await Axios.put<{ user: ResUser }>(`/users/update/${userId}`, userData);
            if (users) {
                const filterUsers = users.map((user) => {
                    if (user.id === data.user.id) {
                        return { ...data.user };
                    } else {
                        return user;
                    }
                });
                setUsers(filterUsers);
            }
            toast.success('User updated');
        } catch (error) {
            setIsError(true);
            const err = await handleAxiosError(error);
            toast.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteUser = async (userId: string) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const { data } = await Axios.delete<{ user: ResUser }>(`/users/delete/${userId}`);
            if (users) {
                const filterUsers = users.filter((user) => user.id !== data.user.id);
                setUsers(filterUsers);
            }

            toast.success('User Deleted');
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        isLoading,
        isError,
        users,
        getALlUser,
        createUser,
        updateUser,
        deleteUser,
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
