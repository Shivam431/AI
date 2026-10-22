import { Router, type Response } from "express";
import { type DatabaseSync } from "node:sqlite";
import {
  callOpenRouter,
  generateKanbanAiResponse,
  type AiChatMessage,
} from "../services/ai.js";
import { authMiddleware, type AuthenticatedRequest } from "./kanban.js";
import { type BoardData } from "../db.js";

export const createAiRouter = (db: DatabaseSync) => {
  const router = Router();

  // POST /api/ai/test: Diagnostic 2+2 connectivity check
  router.post("/test", async (_req, res: Response) => {
    try {
      const response = await callOpenRouter([
        { role: "user", content: "What is 2+2? Answer with only the digit." },
      ]);
      res.json({ status: "ok", answer: response.trim() });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ status: "error", error: message });
    }
  });

  // POST /api/ai/chat: AI conversational interaction with structured board updates
  router.post(
    "/chat",
    authMiddleware(db),
    async (req: AuthenticatedRequest, res: Response) => {
      const userId = req.userId!;
      const { prompt, chatHistory } = req.body as {
        prompt: string;
        chatHistory?: AiChatMessage[];
      };

      if (!prompt || typeof prompt !== "string") {
        res.status(400).json({ error: "Missing prompt in request body" });
        return;
      }

      // Retrieve current board for the user
      const boardStmt = db.prepare("SELECT data FROM boards WHERE user_id = ?");
      const boardRow = boardStmt.get(userId) as { data: string } | undefined;

      if (!boardRow) {
        res.status(404).json({ error: "Board not found for user" });
        return;
      }

      let currentBoard: BoardData;
      try {
        currentBoard = JSON.parse(boardRow.data);
      } catch {
        res.status(500).json({ error: "Corrupted board data" });
        return;
      }

      try {
        const aiResult = await generateKanbanAiResponse(
          prompt,
          currentBoard,
          chatHistory || []
        );

        // If AI proposed a board update, persist it to SQLite
        if (aiResult.boardUpdate && Array.isArray(aiResult.boardUpdate.columns)) {
          const updateStmt = db.prepare(
            "UPDATE boards SET data = ?, updated_at = datetime('now') WHERE user_id = ?"
          );
          updateStmt.run(JSON.stringify(aiResult.boardUpdate), userId);
        }

        res.json({
          status: "success",
          message: aiResult.message,
          boardUpdate: aiResult.boardUpdate,
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        res.status(500).json({ status: "error", error: message });
      }
    }
  );

  return router;
};
