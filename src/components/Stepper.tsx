import { steps } from '@/utils/data';
import { useEffect, useRef, useState } from 'react';
import { IoCheckmark } from 'react-icons/io5';

interface StepperPropsTypes {
    currentStep: number;
}

type Step = {
    description: string;
    highlighted: boolean;
    selected: boolean;
    completed: boolean;
};

const Stepper = ({ currentStep }: StepperPropsTypes) => {
    const [newStep, setNewStep] = useState<Step[]>([]);

    const updateState = (stepNumber: number, steps: Step[]) => {
        const newSteps = [...steps];
        let count = 0;

        while (count < newSteps.length) {
            if (count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: false,
                };
            } else if (count < stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    completed: true,
                };
            } else {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: false,
                };
            }
            count++;
        }

        return newSteps;
    };

    useEffect(() => {
        const stepsState = steps.map((step, index) => {
            return {
                description: step.name,
                completed: false,
                highlighted: index === 0 ? true : false,
                selected: index === 0 ? true : false,
            };
        });
        const current = updateState(currentStep - 1, stepsState);
        setNewStep(current);
    }, [currentStep]);

    return (
        <div className='mx-4 p-4 px-5 md:px-16 flex justify-between items-center text-slate-800'>
            {newStep.map((step, index) => (
                <div className={`flex items-center ${index !== newStep.length - 1 && 'w-full'}`} key={index}>
                    <div className={`relative flex flex-col items-center text-teal-600`}>
                        <div
                            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-8 w-8 md:h-12 md:w-12 flex items-center justify-center py-3 ${
                                step.selected && 'bg-green-600 text-white font-bold border'
                            }`}
                        >
                            {step.completed ? <IoCheckmark /> : index + 1}
                        </div>
                        <div
                            className={`absolute top-0 text-center mt-10 md:mt-16 md:text-nowrap text-xs font-medium uppercase ${
                                step.completed ? 'text-slate-900' : 'text-gray-400'
                            }`}
                        >
                            {step.description}
                        </div>
                    </div>
                    <div
                        className={`flex-auto border-t-2 border-gray-300 transition duration-500 ease-in-out ${
                            step.completed && 'border-green-600'
                        }`}
                    ></div>
                </div>
            ))}
        </div>
    );
};

export default Stepper;
