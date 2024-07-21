import db, { connectDB } from '@/db/connectDB';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        await connectDB();
        const [users]: any[] = await db.query('SELECT * FROM users');
        if (!users) {
            return NextResponse.json({ message: 'users not found', success: false }, { status: 400 });
        }

        return NextResponse.json({ users, success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error in Get All Users', error: error.message, success: false },
            { status: 500 }
        );
    }
};
