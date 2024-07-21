import { FieldName } from 'react-hook-form';

export type FormData = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    dateOfBirth: string;
    gender: string;
};

export type Step = {
    name: string;
    fields: FieldName<FormData>[];
};

export type User = {
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    address: string;
    city: string;
    dateOfBirth: string;
    state: string;
    zipCode: string;
};

export type ResUser = {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    address: string;
    city: string;
    dateOfBirth: string;
    state: string;
    zipCode: string;
};

export type ALlUsersResType = {
    users: ResUser[];
};

export type DeleteUsersResType = {
    users: ResUser;
};
