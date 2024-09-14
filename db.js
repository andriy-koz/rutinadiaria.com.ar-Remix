// db.js
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let dbInstance;

async function openDb() {
  if (!dbInstance) {
    dbInstance = await open({
      filename: "./database.sqlite",
      driver: sqlite3.Database,
    });
  }
  return dbInstance;
}

async function closeDb() {
  if (dbInstance) {
    await dbInstance.close();
    dbInstance = null;
  }
}

module.exports = { openDb, closeDb };
