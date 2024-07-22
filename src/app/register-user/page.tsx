'use client';
import Preview from '@/components/shared/Preview';
import Stepper from '@/components/Stepper';
import Completed from '@/components/steps/Completed';
import ContactDetails from '@/components/steps/ContactDetails';
import PersonalDetails from '@/components/steps/PersonalDetails';
import UserInfo from '@/components/steps/UserInfo';
import { useUser } from '@/context/UserContext';
import { FormData, User } from '@/types';
import { steps } from '@/utils/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrPrevious } from 'react-icons/gr';
import { Oval } from 'react-loader-spinner';

const Home = () => {
    const { isLoading, isError, createUser, getALlUser } = useUser();
    const [previousStep, setPrevtStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState<User | null>(null);
    const delta = currentStep - previousStep;
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        formState: { errors },
    } = useForm<FormData>();

    const submitForm = async (userData: User) => {
        setUserData(null);
        await createUser(userData);
        if (!isError) {
            await getALlUser();
            setPrevtStep(currentStep);
            setCurrentStep(currentStep + 1);
            router.push('/');
            reset();
        }
    };

    const previewForm: SubmitHandler<FormData> = async (formData) => {
        const userData: User = {
            ...formData,
            name: `${formData.firstname} ${formData.lastname}`,
        };
        setUserData(userData);
    };

    const next = async () => {
        if (currentStep < steps.length + 1) {
            const fields = steps[currentStep - 1].fields;
            const output = await trigger(fields, { shouldFocus: true });

            if (!output) return;

            if (currentStep === steps.length) {
                await handleSubmit(previewForm)();
            } else {
                setPrevtStep(currentStep);
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const prev = () => {
        if (currentStep > 1) {
            setPrevtStep(currentStep);
            setCurrentStep(currentStep - 1);
        }
    };

    const btnStyle = `bg-gray-700 text-slate-100 uppercase text-sm py-2 max-w-32 w-full rounded-md cursor-pointer font-medium border-2 border-slate-300 hover:bg-green-600 active:hover:bg-green-700 hover:text-white transition duration-100 ease-in-out`;

    return (
        <div className='container mx-auto md:px-20'>
            <div className='shadow-md rounded-lg pt-5 md:py-10 md:px-5 bg-white md:my-20 max-md:min-h-screen overflow-hidden'>
                <div className='container'>
                    <Link
                        href={'/'}
                        className='flex items-center mr-4 gap-1 w-32 ml-auto py-2 px-3 text-sm rounded text-white bg-green-500 active:bg-green-600'
                    >
                        <GrPrevious /> All Users
                    </Link>
                    <Stepper currentStep={currentStep} />
                </div>
                <div className='my-12 px-3 md:px-10'>
                    <form className='px-2 md:px-10 py-5 mb-5'>
                        {currentStep === 1 && (
                            <UserInfo delta={delta} register={register} watch={watch} errors={errors} />
                        )}
                        {currentStep === 2 && <ContactDetails delta={delta} register={register} errors={errors} />}
                        {currentStep === 3 && <PersonalDetails delta={delta} register={register} errors={errors} />}
                        {currentStep === 4 && <Completed />}
                    </form>
                    <div className='container flex gap-2 px-10'>
                        <button className={btnStyle} onClick={prev}>
                            Back
                        </button>
                        {currentStep !== 4 && (
                            <button className={btnStyle} onClick={next}>
                                {isLoading ? (
                                    <Oval
                                        visible={true}
                                        width={20}
                                        height={20}
                                        color='#ffffff'
                                        secondaryColor='#d3d3d3'
                                        ariaLabel='oval-loading'
                                        strokeWidth={3}
                                        strokeWidthSecondary={3}
                                    />
                                ) : currentStep === 3 ? (
                                    'Preview'
                                ) : (
                                    'Next'
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Preview userData={userData} setUserData={setUserData} submitForm={submitForm} />
        </div>
    );
};

export default Home;
