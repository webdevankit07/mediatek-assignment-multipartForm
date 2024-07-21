import { Dispatch, SetStateAction } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';

interface PaginationProps {
    pageNo: number;
    totalPages: number;
    pageNumbers: number[];
    handlePrev: () => void;
    handleNext: () => void;
    setPageNo: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ pageNo, totalPages, pageNumbers, handlePrev, handleNext, setPageNo }: PaginationProps) => {
    return (
        <div className='py-5 flex justify-center items-center gap-10'>
            <div className='flex items-center gap-5'>
                <button
                    disabled={pageNo === 1}
                    className='flex items-center justify-center gap-1 py-2 px-3 rounded-md min-w-[50px] md:min-w-[80px] text-xs bg-gray-800 text-white disabled:bg-gray-400'
                    onClick={handlePrev}
                >
                    <GrPrevious />
                    Prev
                </button>
                <div className='flex items-center gap-2'>
                    {pageNumbers.map((pageNumber) => (
                        <div
                            key={pageNumber}
                            className={`py-1 px-3 rounded text-white cursor-pointer ${
                                pageNumber === pageNo ? 'bg-gray-900 border-2 border-blue-500' : 'bg-gray-500 border-2'
                            }`}
                            onClick={() => setPageNo(pageNumber)}
                        >
                            {pageNumber}
                        </div>
                    ))}
                </div>
                <button
                    disabled={pageNo === totalPages}
                    className='flex items-center justify-center gap-1 py-2 px-3 rounded-md min-w-[50px] md:min-w-[80px] text-xs bg-gray-800 text-white disabled:bg-gray-400'
                    onClick={handleNext}
                >
                    Next
                    <GrNext />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
