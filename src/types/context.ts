import { ResUser, User } from '.';

export type UserContexType = {
    isLoading: boolean;
    isError: boolean;
    users: ResUser[] | null;
    getALlUser: () => Promise<void>;
    createUser: (val: User) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;
};
