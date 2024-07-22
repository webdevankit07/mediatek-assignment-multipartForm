import db from '@/db/connectDB';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const { name, email, phoneNumber, gender, dateOfBirth, address, city, state, zipCode } = await req.json();

        const [user]: any[] = await db.query(`SELECT * FROM users WHERE id = "${params.id}"`);
        if (!user.length) {
            return NextResponse.json({ message: 'user not exist', success: false }, { status: 400 });
        }

        const [isEmailExist]: any[] = await db.query(`SELECT * FROM users WHERE email = "${email}"`);
        if (isEmailExist.length) {
            if (user[0].email !== isEmailExist[0].email) {
                return NextResponse.json({ message: 'email already exist', success: false }, { status: 400 });
            }
        }

        const [isPhoneNumberExist]: any[] = await db.query(`SELECT * FROM users WHERE phoneNumber = "${phoneNumber}"`);
        if (isPhoneNumberExist.length) {
            if (user[0].phoneNumber !== isPhoneNumberExist[0].phoneNumber) {
                return NextResponse.json({ message: 'phoneNumber already exist', success: false }, { status: 400 });
            }
        }

        await db.query(
            `UPDATE users SET name = "${name}", email = "${email}", phoneNumber = "${phoneNumber}", gender = "${gender}", dateOfBirth = "${dateOfBirth}", address = "${address}", city = "${city}", state = "${state}", zipCode = "${zipCode}" WHERE id = "${params.id}"`
        );

        const [updatedUser]: any[] = await db.query(`SELECT * FROM users WHERE id = "${params.id}"`);

        return NextResponse.json({ user: updatedUser[0], message: 'user created', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error while creating user data', error: error.message, success: false },
            { status: 500 }
        );
    }
};
