import db from '@/db/connectDB';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const [user]: any[] = await db.query(`SELECT * FROM users WHERE id = "${params.id}"`);
        if (!user.length) {
            return NextResponse.json({ message: 'user not exist', success: false }, { status: 400 });
        }

        await db.query(`DELETE FROM users WHERE id = "${params.id}"`);

        return NextResponse.json({ user: user[0], message: 'user delted succesfully', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error while creating user data', error: error.message, success: false },
            { status: 500 }
        );
    }
};
