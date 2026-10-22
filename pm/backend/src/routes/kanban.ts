import { Router, type Request, type Response, type NextFunction } from "express";
import { type DatabaseSync } from "node:sqlite";
import { defaultInitialBoardData, type BoardData } from "../db.js";

export interface AuthenticatedRequest extends Request {
  username?: string;
  userId?: string;
}

// Authentication middleware checking username header or defaulting to 'user' for MVP
export const authMiddleware = (db: DatabaseSync) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const usernameHeader = req.header("x-user") || "user";

    const userStmt = db.prepare("SELECT id, username FROM users WHERE username = ?");
    const userRow = userStmt.get(usernameHeader) as { id: string; username: string } | undefined;

    if (!userRow) {
      res.status(401).json({ error: "User not found or unauthenticated" });
      return;
    }

    req.userId = userRow.id;
    req.username = userRow.username;
    next();
  };
};

export const createKanbanRouter = (db: DatabaseSync) => {
  const router = Router();

  // GET /api/board: Fetch user board (or create default if missing)
  router.get("/", authMiddleware(db), (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId!;

    const boardStmt = db.prepare("SELECT data FROM boards WHERE user_id = ?");
    let boardRow = boardStmt.get(userId) as { data: string } | undefined;

    if (!boardRow) {
      const initialDataJson = JSON.stringify(defaultInitialBoardData);
      db.prepare("INSERT INTO boards (id, user_id, data) VALUES (?, ?, ?)").run(
        `board-${userId}`,
        userId,
        initialDataJson
      );
      boardRow = { data: initialDataJson };
    }

    try {
      const boardData = JSON.parse(boardRow.data);
      res.json(boardData);
    } catch {
      res.status(500).json({ error: "Failed to parse board data" });
    }
  });

  // PUT /api/board: Save updated board JSON
  router.put("/", authMiddleware(db), (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId!;
    const boardData = req.body as BoardData;

    // Validate board structure
    if (
      !boardData ||
      !Array.isArray(boardData.columns) ||
      typeof boardData.cards !== "object" ||
      boardData.cards === null
    ) {
      res.status(400).json({
        error: "Invalid board data. Must contain columns array and cards object.",
      });
      return;
    }

    const dataJson = JSON.stringify(boardData);

    const updateStmt = db.prepare(
      "UPDATE boards SET data = ?, updated_at = datetime('now') WHERE user_id = ?"
    );
    const result = updateStmt.run(dataJson, userId);

    if (result.changes === 0) {
      db.prepare("INSERT INTO boards (id, user_id, data) VALUES (?, ?, ?)").run(
        `board-${userId}`,
        userId,
        dataJson
      );
    }

    res.json({ status: "success", board: boardData });
  });

  return router;
};
