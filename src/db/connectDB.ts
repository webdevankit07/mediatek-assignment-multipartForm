import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
});

export const connectDB = async () => {
    try {
        const connection = await db.query('SELECT 1');
        console.log('Database connected Successfully');
    } catch (error: any) {
        console.log('Database connection Error: ' + error.message);
        process.exit(1);
    }
};

export default db;