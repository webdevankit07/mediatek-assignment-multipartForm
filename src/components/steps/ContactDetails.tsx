import { FormData } from '@/types';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import FormHeading from '../shared/FormHeading';
import { cities, states } from '@/utils/data';
import { motion } from 'framer-motion';

interface ContactDetailsProps {
    delta: number;
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
}

const ContactDetails = ({ delta, register, errors }: ContactDetailsProps) => {
    return (
        <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <FormHeading heading='Contact Details - Address' subheading='Provide your correct address.' />
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
                        {...register('address', {
                            required: { value: true, message: 'address is required' },
                            minLength: { value: 10, message: 'address must be atleast 10 characters' },
                            maxLength: {
                                value: 200,
                                message: 'maximun character reached',
                            },
                        })}
                    />
                    <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>{errors.address?.message}</span>
                </div>
                <div className='flex max-lg:flex-col items-center gap-3 md:gap-5'>
                    <div className='relative flex flex-col w-full'>
                        <label htmlFor='city' className='text-sm mb-2 cursor-pointer'>
                            City
                        </label>
                        <select
                            id='city'
                            autoComplete='off'
                            className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
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
                        <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>{errors.city?.message}</span>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='state' className='text-sm mb-2 cursor-pointer'>
                            State
                        </label>
                        <select
                            id='state'
                            autoComplete='off'
                            className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
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
                        <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>{errors.state?.message}</span>
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
        </motion.div>
    );
};

export default ContactDetails;
