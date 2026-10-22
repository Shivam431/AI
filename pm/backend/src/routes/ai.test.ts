import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { createApp } from "../server.js";
import { initDatabase, type BoardData } from "../db.js";
import { type DatabaseSync } from "node:sqlite";
import * as aiService from "../services/ai.js";

describe("AI API Endpoints (/api/ai)", () => {
  let db: DatabaseSync;

  beforeEach(() => {
    db = initDatabase(":memory:");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    db.close();
  });

  it("POST /api/ai/test performs connectivity check", async () => {
    vi.spyOn(aiService, "callOpenRouter").mockResolvedValue("4");

    const app = createApp(db);
    const res = await request(app).post("/api/ai/test");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.answer).toBe("4");
  });

  it("POST /api/ai/chat returns conversational response without board updates", async () => {
    vi.spyOn(aiService, "generateKanbanAiResponse").mockResolvedValue({
      message: "You have 5 columns and 8 active cards.",
    });

    const app = createApp(db);
    const res = await request(app)
      .post("/api/ai/chat")
      .set("x-user", "user")
      .send({ prompt: "How many cards do I have?" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toContain("5 columns");
    expect(res.body.boardUpdate).toBeUndefined();
  });

  it("POST /api/ai/chat applies structured board updates to database", async () => {
    // Read initial board from db
    const boardRow = db
      .prepare("SELECT data FROM boards WHERE user_id = ?")
      .get("user-default") as { data: string };
    const boardData: BoardData = JSON.parse(boardRow.data);

    // AI proposed board update
    const updatedBoard: BoardData = {
      ...boardData,
      columns: [
        ...boardData.columns,
        { id: "col-new", title: "Archive", cardIds: [] },
      ],
    };

    vi.spyOn(aiService, "generateKanbanAiResponse").mockResolvedValue({
      message: "Added an Archive column for you.",
      boardUpdate: updatedBoard,
    });

    const app = createApp(db);
    const res = await request(app)
      .post("/api/ai/chat")
      .set("x-user", "user")
      .send({ prompt: "Add an archive column" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.boardUpdate.columns).toHaveLength(6);

    // Verify database was updated
    const updatedRow = db
      .prepare("SELECT data FROM boards WHERE user_id = ?")
      .get("user-default") as { data: string };
    const savedBoard: BoardData = JSON.parse(updatedRow.data);
    expect(savedBoard.columns).toHaveLength(6);
    expect(savedBoard.columns[5].title).toBe("Archive");
  });
});
