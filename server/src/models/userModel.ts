import pool from "@/db";
import { User, UserId } from "@/types/user";

export async function findOrCreateUser(
  auth0Id: string,
  email: string,
  nickname: string
): Promise<User> {
  let result = await pool.query(
    "SELECT id, auth0_id, email, nickname, created_at FROM users WHERE auth0_id = $1",
    [auth0Id]
  );

  if (result.rowCount === 0) {
    result = await pool.query(
      "INSERT INTO users (auth0_id, email, nickname) VALUES ($1, $2, $3) RETURNING *",
      [auth0Id, email, nickname]
    );
  }

  return result.rows[0] as User;
}

export async function getUserBySub(auth0Id: string): Promise<User | null> {
  const result = await pool.query(
    "SELECT id, auth0_id, email, nickname, created_at FROM users WHERE auth0_id = $1",
    [auth0Id]
  );
  return result.rows[0] ?? null;
}

export async function getUserIdBySub(auth0Id: string): Promise<UserId | null> {
  const user = await getUserBySub(auth0Id);
  return user ? { id: user.id } : null;
}
export async function getAverageScore(userId: number) {
  const result = await pool.query("SELECT AVG(score) AS avg FROM reviews WHERE user_id = $1", [
    userId,
  ]);
  console.log("gotten average score", result.rows[0].avg);
  return result.rows[0].avg;
}
