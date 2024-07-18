import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import FormHeading from '../shared/FormHeading';
import { FormData } from '@/types';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface UserInfoProps {
    delta: number;
    register: UseFormRegister<FormData>;
    watch: UseFormWatch<FormData>;
    errors: FieldErrors<FormData>;
}

const UserInfo = ({ delta, register, watch, errors }: UserInfoProps) => {
    return (
        <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <FormHeading heading='User Information' subheading='Provide your details.' />
            <div className='mt-5 space-y-7'>
                <div className='flex max-lg:flex-col items-center gap-7 md:gap-5'>
                    <div className='relative flex flex-col w-full'>
                        <label htmlFor='firstname' className='text-sm mb-2 cursor-pointer'>
                            First name
                        </label>
                        <input
                            type='text'
                            id='firstname'
                            autoComplete='off'
                            placeholder='First name'
                            className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                            {...register('firstname', {
                                required: { value: true, message: 'firstname is required' },
                                minLength: { value: 3, message: 'firstname must be atleast 3 characters' },
                                maxLength: {
                                    value: 100,
                                    message: 'firstname must be atmost 100 characters',
                                },
                            })}
                        />
                        <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>
                            {errors.firstname?.message}
                        </span>
                    </div>
                    <div className='relative flex flex-col w-full'>
                        <label htmlFor='lastname' className='text-sm mb-2 cursor-pointer'>
                            Last name
                        </label>
                        <input
                            type='text'
                            id='lastname'
                            autoComplete='off'
                            placeholder='Last name'
                            className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                            {...register('lastname', {
                                required: { value: true, message: 'lastname is required' },
                                min: { value: 3, message: 'lastname must be atleast 3 characters' },
                                max: { value: 100, message: 'lastname must be atmost 100 characters' },
                            })}
                        />
                        <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>
                            {errors.lastname?.message}
                        </span>
                    </div>
                </div>
                <div className='relative flex max-lg:flex-col items-center gap-7 md:gap-5'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='email' className='text-sm mb-2 cursor-pointer'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            autoComplete='off'
                            placeholder='Enter email address'
                            className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                            {...register('email', {
                                required: { value: true, message: 'email required' },
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                                    message: 'Invalid Email Id',
                                },
                                validate: {
                                    lengthError: (value) => {
                                        return value.length > 6 || 'please enter a valid email address';
                                    },
                                },
                            })}
                        />
                        <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>{errors.email?.message}</span>
                    </div>
                    <div className='relative flex flex-col w-full'>
                        <label htmlFor='phoneNumber' className='text-sm mb-2 cursor-pointer'>
                            Phone number
                        </label>
                        <input
                            type='text'
                            id='phoneNumber'
                            autoComplete='off'
                            placeholder='Enter phone number'
                            className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                            {...register('phoneNumber', {
                                required: { value: true, message: 'mobile is required' },
                                validate: {
                                    lengthError: (value) => {
                                        if (value.length > 10) {
                                            return 'Invalid mobile number';
                                        } else if (value.length < 10) {
                                            return 'Invalid mobile number';
                                        }
                                    },
                                },
                            })}
                        />
                        <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>
                            {errors.phoneNumber?.message}
                        </span>
                    </div>
                </div>
                <div className='relative flex flex-col w-full'>
                    <label htmlFor='password' className='text-sm mb-2 cursor-pointer'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        autoComplete='off'
                        placeholder='Enter password'
                        className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                        {...register('password', {
                            required: { value: true, message: 'password is required' },
                            validate: {
                                lengthError: (value) => {
                                    return value.length >= 8 || 'password must be atleast 8 characters';
                                },
                            },
                        })}
                    />
                    <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>{errors.password?.message}</span>
                </div>
                <div className='relative flex flex-col w-full'>
                    <label htmlFor='confirmPassword' className='text-sm mb-2 cursor-pointer'>
                        Confirm password
                    </label>
                    <input
                        type='password'
                        id='confirmPassword'
                        autoComplete='off'
                        placeholder='Enter confirm password'
                        className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                        {...register('confirmPassword', {
                            required: { value: true, message: 'Please confirm the password' },
                            validate: (value) => {
                                return watch('password') === value || 'your password does not match';
                            },
                        })}
                    />
                    <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>
                        {errors.confirmPassword?.message}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default UserInfo;
