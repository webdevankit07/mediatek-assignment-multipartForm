'use client';
import Loading from '@/components/shared/Loading';
import Pagination from '@/components/UserData/Pagination';
import UsersTable from '@/components/UserData/UsersTable';
import { useUser } from '@/context/UserContext';
import { User } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Home = () => {
    const { users } = useUser();
    const [filterUsers, setFilterUsers] = useState<User[] | null>(null);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([0]);

    useEffect(() => {
        if (users) {
            const filterUsers = users?.slice((pageNo - 1) * 10, pageNo * 10);
            const totalPages = Math.ceil(users.length / 10);
            const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

            setFilterUsers(filterUsers);
            setTotalPages(totalPages);
            setPageNumbers(pageNumbers);
        }
    }, [users, pageNo]);

    const handlePrev = () => {
        if (pageNo > 1) {
            setPageNo((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (pageNo < totalPages) {
            setPageNo((prev) => prev + 1);
        }
    };

    return !filterUsers ? (
        <Loading />
    ) : (
        <div className='container mx-auto md:px-8 lg:px-20'>
            <div className='shadow-md rounded-lg pt-5 sm:my-5 md:py-10 px-5 md:px-8 bg-white md:my-20 max-md:min-h-screen overflow-hidden'>
                <div className='flex items-center justify-between w-full py-2 px-5 bg-blue-900 rounded-md mb-8'>
                    <h2 className='font-bold text-center text-white'>All Users</h2>
                    <Link
                        href={'/register-user'}
                        className='py-2 px-5 text-sm rounded text-white inline-block bg-green-500 active:bg-green-600'
                    >
                        Register User
                    </Link>
                </div>
                {/* User Data */}
                <UsersTable filterUsers={filterUsers} />

                {/* Pagination.. */}
                <Pagination
                    pageNo={pageNo}
                    setPageNo={setPageNo}
                    totalPages={totalPages}
                    pageNumbers={pageNumbers}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                />
            </div>
        </div>
    );
};

export default Home;
