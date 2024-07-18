'use client';
import Stepper from '@/components/Stepper';
import Completed from '@/components/steps/Completed';
import ContactDetails from '@/components/steps/ContactDetails';
import PersonalDetails from '@/components/steps/PersonalDetails';
import UserInfo from '@/components/steps/UserInfo';
import { FormData } from '@/types';
import { steps } from '@/utils/data';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const Home = () => {
    const [previousStep, setPrevtStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(1);
    const delta = currentStep - previousStep;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        formState: { errors },
    } = useForm<FormData>();

    const submitForm: SubmitHandler<FormData> = async (formData) => {
        console.log(formData);

        setTimeout(() => {
            reset();
            setCurrentStep(1);
        }, 2000);
        setCurrentStep(1);
    };

    const next = async () => {
        if (currentStep < steps.length + 1) {
            // const fields = steps[currentStep - 1].fields;
            // const output = await trigger(fields, { shouldFocus: true });

            // if (!output) return;

            if (currentStep === steps.length) {
                await handleSubmit(submitForm)();
            }
            setPrevtStep(currentStep);
            setCurrentStep(currentStep + 1);
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
                    <Stepper currentStep={currentStep} />
                </div>
                <div className='my-12 px-10'>
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
                        <button className={btnStyle} onClick={next}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
