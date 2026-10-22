import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

export type Card = {
  id: string;
  title: string;
  details: string;
};

export type Column = {
  id: string;
  title: string;
  cardIds: string[];
};

export type BoardData = {
  columns: Column[];
  cards: Record<string, Card>;
};

export const defaultInitialBoardData: BoardData = {
  columns: [
    { id: "col-backlog", title: "Backlog", cardIds: ["card-1", "card-2"] },
    { id: "col-discovery", title: "Discovery", cardIds: ["card-3"] },
    {
      id: "col-progress",
      title: "In Progress",
      cardIds: ["card-4", "card-5"],
    },
    { id: "col-review", title: "Review", cardIds: ["card-6"] },
    { id: "col-done", title: "Done", cardIds: ["card-7", "card-8"] },
  ],
  cards: {
    "card-1": {
      id: "card-1",
      title: "Align roadmap themes",
      details: "Draft quarterly themes with impact statements and metrics.",
    },
    "card-2": {
      id: "card-2",
      title: "Gather customer signals",
      details: "Review support tags, sales notes, and churn feedback.",
    },
    "card-3": {
      id: "card-3",
      title: "Prototype analytics view",
      details: "Sketch initial dashboard layout and key drill-downs.",
    },
    "card-4": {
      id: "card-4",
      title: "Refine status language",
      details: "Standardize column labels and tone across the board.",
    },
    "card-5": {
      id: "card-5",
      title: "Design card layout",
      details: "Add hierarchy and spacing for scanning dense lists.",
    },
    "card-6": {
      id: "card-6",
      title: "QA micro-interactions",
      details: "Verify hover, focus, and loading states.",
    },
    "card-7": {
      id: "card-7",
      title: "Ship marketing page",
      details: "Final copy approved and asset pack delivered.",
    },
    "card-8": {
      id: "card-8",
      title: "Close onboarding sprint",
      details: "Document release notes and share internally.",
    },
  },
};

export const initDatabase = (dbFilePath?: string) => {
  const filePath =
    dbFilePath ||
    process.env.DATABASE_FILE ||
    path.resolve(process.cwd(), "data", "pm.db");

  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new DatabaseSync(filePath);

  // Enable WAL mode and foreign keys for SQLite
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS boards (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_boards_user_id ON boards(user_id);
  `);

  // Seed default user and initial board if not exists
  const userStmt = db.prepare("SELECT id FROM users WHERE username = ?");
  const defaultUser = userStmt.get("user") as { id: string } | undefined;

  let userId: string;
  if (!defaultUser) {
    userId = "user-default";
    db.prepare("INSERT INTO users (id, username) VALUES (?, ?)").run(
      userId,
      "user"
    );
  } else {
    userId = defaultUser.id;
  }

  const boardStmt = db.prepare("SELECT id FROM boards WHERE user_id = ?");
  const userBoard = boardStmt.get(userId) as { id: string } | undefined;

  if (!userBoard) {
    db.prepare(
      "INSERT INTO boards (id, user_id, data) VALUES (?, ?, ?)"
    ).run("board-default", userId, JSON.stringify(defaultInitialBoardData));
  }

  return db;
};
