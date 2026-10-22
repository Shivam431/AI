import { describe, it, expect, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { initDatabase, type BoardData } from "./db.js";

describe("Database Initialization & Schema", () => {
  const testDbDir = path.resolve(process.cwd(), "data-test");
  const testDbFile = path.join(testDbDir, "test.db");

  afterEach(() => {
    if (fs.existsSync(testDbDir)) {
      fs.rmSync(testDbDir, { recursive: true, force: true });
    }
  });

  it("automatically creates database file and tables on clean startup", () => {
    expect(fs.existsSync(testDbFile)).toBe(false);

    const db = initDatabase(testDbFile);
    expect(fs.existsSync(testDbFile)).toBe(true);

    // Verify users table exists and seeded default user
    const userRow = db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get("user") as { id: string; username: string };
    expect(userRow).toBeDefined();
    expect(userRow.username).toBe("user");

    // Verify boards table exists and seeded default board data
    const boardRow = db
      .prepare("SELECT * FROM boards WHERE user_id = ?")
      .get(userRow.id) as { id: string; data: string };
    expect(boardRow).toBeDefined();

    const parsedBoard = JSON.parse(boardRow.data) as BoardData;
    expect(parsedBoard.columns).toHaveLength(5);
    expect(Object.keys(parsedBoard.cards).length).toBe(8);

    db.close();
  });
});
