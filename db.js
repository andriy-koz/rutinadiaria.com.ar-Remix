import sqlite3 from "sqlite3";
import { open } from "sqlite";

let dbInstance;

export async function openDb() {
  if (!dbInstance) {
    dbInstance = await open({
      filename: "./database.sqlite",
      driver: sqlite3.Database,
    });
  }
  return dbInstance;
}

export async function closeDb() {
  if (dbInstance) {
    await dbInstance.close();
    dbInstance = null;
  }
}
