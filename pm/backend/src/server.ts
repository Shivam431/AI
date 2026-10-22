import express from "express";
import cors from "cors";
import path from "node:path";
import dotenv from "dotenv";
import { type DatabaseSync } from "node:sqlite";
import { initDatabase } from "./db.js";
import { createKanbanRouter } from "./routes/kanban.js";
import { createAiRouter } from "./routes/ai.js";

dotenv.config();

export const createApp = (dbOrPath?: DatabaseSync | string) => {
  const app = express();
  const db =
    typeof dbOrPath === "object" && dbOrPath !== null
      ? dbOrPath
      : initDatabase(typeof dbOrPath === "string" ? dbOrPath : undefined);

  app.use(cors());
  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Kanban persistence API
  app.use("/api/board", createKanbanRouter(db));

  // AI assistant API
  app.use("/api/ai", createAiRouter(db));

  // Serve static files (such as statically built NextJS frontend or demo HTML)
  const publicDir = path.resolve(process.cwd(), "public");
  app.use(express.static(publicDir));

  // Fallback route for SPA / static frontend
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) {
      return next();
    }
    res.sendFile(path.join(publicDir, "index.html"), (err) => {
      if (err) {
        next();
      }
    });
  });

  return app;
};

export const startServer = (port = process.env.PORT || 3000) => {
  const app = createApp();
  return app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}
