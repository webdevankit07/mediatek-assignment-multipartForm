import { useUser } from '@/context/UserContext';
import { ResUser } from '@/types';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import UserData from './UserData';

interface UsersTableProps {
    filterUsers: ResUser[];
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
                    <UserData user={user} index={index} key={user.id} />
                ))}
            </tbody>
        </table>
    );
};

export default UsersTable;
