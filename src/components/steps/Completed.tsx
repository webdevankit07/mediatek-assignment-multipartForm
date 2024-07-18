import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Completed = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-5 min-h-[20vh]'>
            <motion.div
                initial={{ scale: '30%', opacity: 0 }}
                animate={{ scale: '100%', opacity: 1 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
                <FaCheckCircle size={100} className='text-green-600' />
            </motion.div>
            <div>
                <h2 className='font-bold mb-2 text-center'>Complete</h2>
                <h2 className='text-xs text-slate-700'>Your data is submited. Thanku for submission</h2>
            </div>
        </div>
    );
};

export default Completed;
