import { FormData } from '@/types';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import FormHeading from '../shared/FormHeading';
import { motion } from 'framer-motion';

interface PersonalDetailsProps {
    delta: number;
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
}

const PersonalDetails = ({ delta, register, errors }: PersonalDetailsProps) => {
    return (
        <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <FormHeading heading='Personal details' subheading='Provide your personal details.' />
            <div className='mt-5 flex max-md:flex-col gap-5'>
                <div className='relative flex flex-col w-full'>
                    <label htmlFor='dateofb' className='text-sm mb-2 cursor-pointer'>
                        Date of Birth
                    </label>
                    <input
                        type='date'
                        id='address'
                        autoComplete='off'
                        className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                        {...register('dateOfBirth', {
                            required: { value: true, message: 'address is required' },
                        })}
                    />
                    <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>
                        {errors.dateOfBirth?.message}
                    </span>
                </div>
                <div className='flex items-center gap-3 md:gap-5 w-full'>
                    <div className='relative flex flex-col w-full'>
                        <label htmlFor='gender' className='text-sm mb-2 cursor-pointer'>
                            Gender
                        </label>
                        <select
                            id='gender'
                            autoComplete='off'
                            className='border-2 border-gray-400 py-2 px-3 text-sm outline-slate-900 rounded w-full'
                            {...register('gender', {
                                required: { value: true, message: 'Please select your gender' },
                            })}
                        >
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='other'>Other</option>
                        </select>
                        <span className='absolute top-16 text-xs mt-2 ml-1 text-red-500'>{errors.gender?.message}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PersonalDetails;
