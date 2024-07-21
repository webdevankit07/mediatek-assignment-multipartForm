import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import UserContextProvider from '@/context/UserContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'User Registration',
    description: 'User registration form',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <UserContextProvider>
                    {children}
                    <Toaster position='top-center' reverseOrder={false} />
                </UserContextProvider>
            </body>
        </html>
    );
}
