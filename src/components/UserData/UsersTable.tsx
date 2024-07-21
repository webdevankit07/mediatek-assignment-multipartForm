import { User } from '@/types';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

interface UsersTableProps {
    filterUsers: User[];
}

const UsersTable = ({ filterUsers }: UsersTableProps) => {
    return (
        <table className='w-full border border-slate-300'>
            <thead>
                <tr className='*:py-3 *:px-3 *:max-md:text-sm'>
                    <th>Si.No.</th>
                    <th className='max-[450px]:hidden'>Name</th>
                    <th className='max-[450px]:hidden'>Email</th>
                    <th className='min-[450px]:hidden'>Details</th>
                    <th className='max-lg:hidden'>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filterUsers.map((user, index) => (
                    <tr
                        key={user.id}
                        className='border border-slate-300 hover:bg-slate-100 transition duration-100 ease-in-out cursor-pointer *:text-center *:py-2 max-md:text-xs    text-sm'
                    >
                        <td className='font-semibold'>{++index}</td>
                        <td className='max-[450px]:hidden'>{user.name}</td>
                        <td className='max-[450px]:hidden'>{user.email}</td>
                        <td className='min-[450px]:hidden space-y-2'>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                        </td>
                        <td className='max-lg:hidden'>{user.phoneNumber}</td>
                        <td className='flex max-sm:flex-col px-3 justify-center items-center gap-3 lg:space-x-5 *:flex *:items-center *:gap-2 *:py-1.5 *:px-3 *:rounded *:min-w-[50px] *:md:min-w-[80px] *:text-xs'>
                            <button className='bg-green-600 hover:bg-green-500 active:bg-green-600 text-white'>
                                <AiFillEdit />
                                Edit
                            </button>
                            <button className='bg-red-700 hover:bg-red-600 active:bg-red-700 text-white'>
                                <MdDelete />
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsersTable;
