import bcrypt from "bcrypt";
import { openDb } from "../../db.js";

export async function checkIfEmailExists(email) {
  const db = await openDb();
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  return user ? true : false;
}

export async function registerUser(username, email, password) {
  const db = await openDb();
  const passwordHash = await bcrypt.hash(password, 10);

  await db.run(
    "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
    [username, email, passwordHash]
  );
}

export async function authenticateUser(username, password) {
  const db = await openDb();
  const user = await db.get("SELECT * FROM users WHERE username = ?", [
    username,
  ]);

  if (user && (await bcrypt.compare(password, user.password_hash))) {
    return user;
  } else {
    throw new Error("Invalid credentials");
  }
}
