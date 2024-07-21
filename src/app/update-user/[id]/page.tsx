'use client';
import Loading from '@/components/shared/Loading';
import { Axios, handleAxiosError } from '@/config/axios';
import { useUser } from '@/context/UserContext';
import { FormData, ResUser, User } from '@/types';
import { cities, states } from '@/utils/data';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const UpdateUser = ({ params }: { params: { id: string } }) => {
    const { isLoading, isError, updateUser, getALlUser } = useUser();
    const [user, setUser] = useState<ResUser | null>(null);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await Axios.get<{ user: ResUser }>(`/users/${params.id}`);
                setUser(data.user);
            } catch (error) {
                const err = await handleAxiosError(error);
                toast.error(err);
            }
        })();
    }, [params.id]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const submitForm: SubmitHandler<FormData> = async (formData) => {
        const userData: User = {
            ...formData,
            name: `${formData.firstname}`,
        };
        await updateUser(userData, params.id);
        console.log(isError);
        if (!isError) {
            await getALlUser();
            router.push('/');
            reset();
        }
    };

    return !user ? (
        <Loading />
    ) : (
        <div className='container mx-auto md:px-20'>
            <div className='shadow-md rounded-lg pt-5 md:py-10 md:px-5 bg-white md:my-20 max-md:min-h-screen overflow-hidden'>
                <div>
                    <h2 className='font-bold mb-2 text-center text-xl'>Update User</h2>
                    <h2 className='text-xs text-slate-700 text-center underline'>Update all the details</h2>
                </div>
                <form className='px-2 md:px-10 py-5 mb-5' onSubmit={handleSubmit(submitForm)}>
                    <div className='mt-5 space-y-7'>
                        <div className='relative flex flex-col w-full'>
                            <label htmlFor='name' className='text-sm mb-2 cursor-pointer'>
                                Name
                            </label>
                            <input
                                type='text'
                                id='name'
                                autoComplete='off'
                                placeholder='Enter user name'
                                className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                                defaultValue={user.name}
                                {...register('firstname', {
                                    required: { value: true, message: 'firstname is required' },
                                    minLength: {
                                        value: 3,
                                        message: 'firstname must be atleast 3 characters',
                                    },
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
                                    defaultValue={user.email}
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
                                <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>
                                    {errors.email?.message}
                                </span>
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
                                    defaultValue={user.phoneNumber}
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
                    </div>
                    <div className='mt-5 space-y-7'>
                        <div className='relative flex flex-col w-full'>
                            <label htmlFor='address' className='text-sm mb-2 cursor-pointer'>
                                Address
                            </label>
                            <input
                                type='text'
                                id='address'
                                autoComplete='off'
                                placeholder='Enter address'
                                className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                                defaultValue={user.address}
                                {...register('address', {
                                    required: { value: true, message: 'address is required' },
                                    minLength: { value: 10, message: 'address must be atleast 10 characters' },
                                    maxLength: {
                                        value: 200,
                                        message: 'maximun character reached',
                                    },
                                })}
                            />
                            <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>
                                {errors.address?.message}
                            </span>
                        </div>
                        <div className='flex max-lg:flex-col items-center gap-5'>
                            <div className='relative flex flex-col w-full'>
                                <label htmlFor='city' className='text-sm mb-2 cursor-pointer'>
                                    City
                                </label>
                                <select
                                    id='city'
                                    autoComplete='off'
                                    className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                                    defaultValue={user.city}
                                    {...register('city', {
                                        required: { value: true, message: 'city is required' },
                                    })}
                                >
                                    {cities.map((city, index) => (
                                        <option value={city} key={index}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                                <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>
                                    {errors.city?.message}
                                </span>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='state' className='text-sm mb-2 cursor-pointer'>
                                    State
                                </label>
                                <select
                                    id='state'
                                    autoComplete='off'
                                    className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                                    defaultValue={user.state}
                                    {...register('state', {
                                        required: { value: true, message: 'state is required' },
                                    })}
                                >
                                    {states.map((state, index) => (
                                        <option value={state} key={index}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                                <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>
                                    {errors.state?.message}
                                </span>
                            </div>
                            <div className='relative flex flex-col w-full'>
                                <label htmlFor='zipCode' className='text-sm mb-2 cursor-pointer'>
                                    Zipcode ( Pincode )
                                </label>
                                <input
                                    type='text'
                                    id='zipCode'
                                    autoComplete='off'
                                    placeholder='Enter zipcode'
                                    className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                                    defaultValue={user.zipCode}
                                    {...register('zipCode', {
                                        required: { value: true, message: 'zipcode is required' },
                                    })}
                                />
                                <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>
                                    {errors.zipCode?.message}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 flex max-md:flex-col gap-7 md:gap-5'>
                        <div className='relative flex flex-col w-full'>
                            <label htmlFor='dateofb' className='text-sm mb-2 cursor-pointer'>
                                Date of Birth
                            </label>
                            <input
                                type='date'
                                id='address'
                                autoComplete='off'
                                className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                                defaultValue={new Date(user.dateOfBirth).toDateString()}
                                {...register('dateOfBirth', {
                                    required: { value: true, message: 'dateOfBirth is required' },
                                })}
                            />
                            <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>
                                {errors.dateOfBirth?.message}
                            </span>
                        </div>
                        <div className='flex items-center gap-5 w-full'>
                            <div className='relative flex flex-col w-full'>
                                <label htmlFor='gender' className='text-sm mb-2 cursor-pointer'>
                                    Gender
                                </label>
                                <select
                                    id='gender'
                                    autoComplete='off'
                                    className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                                    defaultValue={user.gender}
                                    {...register('gender', {
                                        required: { value: true, message: 'Please select your gender' },
                                    })}
                                >
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                    <option value='other'>Other</option>
                                </select>
                                <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>
                                    {errors.gender?.message}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <button className='text-sm bg-green-700 text-white px-3 py-2 w-full rounded-md'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;
