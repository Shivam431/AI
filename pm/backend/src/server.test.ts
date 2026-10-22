import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./server.js";

describe("Backend Server Scaffolding", () => {
  const app = createApp();

  it("responds to /api/health with status ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.timestamp).toBeDefined();
  });

  it("serves static Next.js Kanban app on /", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("Kanban Studio");
  });
});
