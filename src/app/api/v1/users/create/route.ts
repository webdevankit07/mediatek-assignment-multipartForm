import db from '@/db/connectDB';
import { NextRequest, NextResponse } from 'next/server';
import { uuid } from 'uuidv4';
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest) => {
    try {
        const {
            name,
            email,
            phoneNumber,
            gender,
            dateOfBirth,
            password: Password,
            address,
            city,
            state,
            zipCode,
        } = await req.json();
        const id = uuid();
        const password = await bcrypt.hash(Password, 10);

        const [isEmailExist]: any[] = await db.query(`SELECT * FROM users WHERE email = "${email}"`);
        if (isEmailExist.length) {
            return NextResponse.json({ message: 'email already exist', success: false }, { status: 400 });
        }

        const [isPhoneNumberExist]: any[] = await db.query(`SELECT * FROM users WHERE phoneNumber = "${phoneNumber}"`);
        if (isPhoneNumberExist.length) {
            return NextResponse.json({ message: 'phoneNumber already exist', success: false }, { status: 400 });
        }

        const data = await db.query(
            `INSERT INTO users (id,name,email,phoneNumber,gender,dateOfBirth,password,address,city,state,zipCode) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [id, name, email, phoneNumber, gender, dateOfBirth, password, address, city, state, zipCode]
        );
        if (!data) {
            return NextResponse.json({ message: 'users not created', success: false }, { status: 400 });
        }

        const [user]: any[] = await db.query(`SELECT * FROM users WHERE id = "${id}"`);

        return NextResponse.json({ user: user[0], message: 'user created', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error while creating user data', error: error.message, success: false },
            { status: 500 }
        );
    }
};
