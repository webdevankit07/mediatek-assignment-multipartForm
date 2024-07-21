import { useUser } from '@/context/UserContext';
import { ResUser } from '@/types';
import Link from 'next/link';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { Oval } from 'react-loader-spinner';

type Props = { user: ResUser; index: number };

const UserData = ({ user, index }: Props) => {
    const { deleteUser, isLoading } = useUser();

    const handleDelete = async (userId: string) => {
        await deleteUser(userId);
    };

    return (
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
                <Link
                    href={`/update-user/${user.id}`}
                    className='bg-green-600 hover:bg-green-500 active:bg-green-600 text-white'
                >
                    <AiFillEdit />
                    Edit
                </Link>
                <button
                    className='bg-red-700 hover:bg-red-600 active:bg-red-700 text-white'
                    onClick={() => handleDelete(user.id)}
                >
                    <MdDelete />
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default UserData;
