interface FormHeadingProps {
    heading: string;
    subheading: string;
}
const FormHeading = ({ heading, subheading }: FormHeadingProps) => {
    return (
        <div>
            <h2 className='font-bold  mb-2'>{heading}</h2>
            <h2 className='text-xs text-slate-700'>{subheading}</h2>
        </div>
    );
};

export default FormHeading;
