import dotenv from 'dotenv';
dotenv.config();

// Import and require Pool (node-postgres)
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: 'localhost',
	database: process.env.DB_LINK,
	port: 5432,
});

const connectToDb = async () => {
	try {
		await pool.connect();
		console.log('Connected to the database.');
	} catch (err) {
		console.error('Error connecting to database:', err);
		process.exit(1);
	}
};

export { pool, connectToDb };

// Taken and edited from curriculum NU-VIRT-FSF-PT-09-2024-U-LOLC\10-SQL\01-Activities\24-Stu_Parameterized-Queries\Solved\src\connection.ts