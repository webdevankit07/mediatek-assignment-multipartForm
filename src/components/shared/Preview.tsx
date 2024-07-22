import { User } from '@/types';
import { Dispatch, SetStateAction } from 'react';

interface PreviewProps {
    userData: User | null;
    setUserData: Dispatch<SetStateAction<User | null>>;
    submitForm: (data: User) => void;
}

const Preview = ({ userData, setUserData, submitForm }: PreviewProps) => {
    return (
        userData && (
            <div className='absolute top-0 left-0 flex items-center justify-center h-screen w-full bg-black/[.7]'>
                <div className='bg-white py-5 px-5 rounded-md min-w-[500px]'>
                    <div className='space-y-1 pb-5'>
                        <div className='text-xs md:text-sm'>
                            <span className='inline-block min-w-[80px] font-medium'>Name: </span>
                            <span>{userData.name}</span>
                        </div>
                        <div className='text-xs md:text-sm'>
                            <span className='inline-block min-w-[80px] font-medium'>Email: </span>
                            <span>{userData.email}</span>
                        </div>
                        <div className='text-xs md:text-sm'>
                            <span className='inline-block min-w-[80px] font-medium'>Mobile no: </span>
                            <span>{userData.phoneNumber}</span>
                        </div>
                        <div className='text-xs md:text-sm'>
                            <span className='inline-block min-w-[80px] font-medium'>Gender: </span>
                            <span>{userData.gender}</span>
                        </div>
                        <div className='text-xs md:text-sm'>
                            <span className='inline-block min-w-[80px] font-medium'>Address: </span>
                            <span>{userData.address}</span>
                        </div>
                        <div className='text-xs md:text-sm'>
                            <span className='inline-block min-w-[80px] font-medium'>DOB: </span>
                            <span>{userData.dateOfBirth}</span>
                        </div>
                        <div className='text-xs md:text-sm'>
                            <span className='inline-block min-w-[80px] font-medium'>City: </span>
                            <span>{userData.city}</span>
                        </div>
                        <div className='text-xs md:text-sm'>
                            <span className='inline-block min-w-[80px] font-medium'>State: </span>
                            <span>{userData.state}</span>
                        </div>
                        <div className='text-xs md:text-sm'>
                            <span className='inline-block min-w-[80px] font-medium'>ZipCode: </span>
                            <span>{userData.zipCode}</span>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center justify-end'>
                        <button
                            onClick={() => setUserData(null)}
                            className='bg-black text-white py-1 px-4 text-sm rounded shadow'
                        >
                            Back
                        </button>
                        <button
                            onClick={() => submitForm(userData)}
                            className='bg-green-700 text-white py-1 px-4 text-sm rounded shadow'
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default Preview;
