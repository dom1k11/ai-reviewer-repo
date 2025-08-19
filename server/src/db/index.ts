import pg from "pg";
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
console.log("DB_URL:", process.env.DATABASE_URL);

export default pool;
