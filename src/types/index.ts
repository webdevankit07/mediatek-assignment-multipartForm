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
    dateOfBirth: Date;
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
    password: string;
    address: string;
    city: string;
    dateOfBirth: Date;
    state: string;
    zipCode: string;
};
