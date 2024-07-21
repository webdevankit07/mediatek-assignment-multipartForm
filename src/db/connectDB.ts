import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
});

export const connectDB = async () => {
    return db.getConnection();
};

export default db;
