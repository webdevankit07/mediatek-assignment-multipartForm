import db from '@/db/connectDB';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const [user]: any[] = await db.query(`SELECT * FROM users WHERE id = "${params.id}"`);

        if (!user.length) {
            return NextResponse.json({ message: 'user not found', success: false }, { status: 400 });
        }

        return NextResponse.json({ user: user[0], success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error while get User', error: error.message, success: false },
            { status: 500 }
        );
    }
};
