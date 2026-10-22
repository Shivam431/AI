import { describe, it, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { createApp } from "../server.js";
import { initDatabase, type BoardData } from "../db.js";
import { type DatabaseSync } from "node:sqlite";

describe("Kanban API Endpoints (/api/board)", () => {
  let db: DatabaseSync;

  beforeEach(() => {
    db = initDatabase(":memory:");
  });

  afterEach(() => {
    db.close();
  });

  it("GET /api/board returns initial board with 5 columns and 8 cards", async () => {
    const app = createApp(db);

    const res = await request(app).get("/api/board").set("x-user", "user");
    expect(res.status).toBe(200);
    expect(res.body.columns).toHaveLength(5);
    expect(Object.keys(res.body.cards).length).toBe(8);
  });

  it("PUT /api/board updates and persists modified board", async () => {
    const app = createApp(db);

    // Initial get
    const getRes = await request(app).get("/api/board").set("x-user", "user");
    const board: BoardData = getRes.body;

    // Modify a column title and add a card
    board.columns[0].title = "Inbox";
    board.cards["new-card-99"] = {
      id: "new-card-99",
      title: "Persisted Card",
      details: "Saved to database",
    };
    board.columns[0].cardIds.push("new-card-99");

    // Put updated board
    const putRes = await request(app)
      .put("/api/board")
      .set("x-user", "user")
      .send(board);
    expect(putRes.status).toBe(200);
    expect(putRes.body.status).toBe("success");

    // Fetch again to verify persistence
    const verifyRes = await request(app)
      .get("/api/board")
      .set("x-user", "user");
    expect(verifyRes.body.columns[0].title).toBe("Inbox");
    expect(verifyRes.body.cards["new-card-99"].title).toBe("Persisted Card");
  });

  it("PUT /api/board rejects invalid board schema with 400", async () => {
    const app = createApp(db);

    const res = await request(app)
      .put("/api/board")
      .set("x-user", "user")
      .send({ invalid: "data" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("rejects unknown user with 401 unauthenticated", async () => {
    const app = createApp(db);

    const res = await request(app)
      .get("/api/board")
      .set("x-user", "non-existent-user");
    expect(res.status).toBe(401);
  });
});
