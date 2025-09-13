vi.mock("@/constants/auth0Claims", () => ({
  AUTH0_CLAIMS: {
    EMAIL: "https://ai-reviewer.com/email",
    NICKNAME: "https://ai-reviewer.com/nickname",
  },
}));

import { describe, it, vi, expect } from "vitest";
import { syncUserWithDatabase, handleGetUser, handleGetAverageScore } from "./userController";
import * as userModel from "@/models/userModel";
import pool from "@/db";

describe("syncUserWithDatabase (mock user)", () => {
  it("should call findOrCreateUser and return the user", async () => {
    const mockUser = { id: 1, email: "test@example.com", nickname: "Test" };
    vi.spyOn(userModel, "findOrCreateUser").mockResolvedValue(mockUser as any);

    const req = {
      auth: {
        payload: {
          sub: "auth0|123",
          "https://ai-reviewer.com/email": "test@example.com",
          "https://ai-reviewer.com/nickname": "Test",
        },
      },
    };

    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    await syncUserWithDatabase(req as any, res as any);

    expect(userModel.findOrCreateUser).toHaveBeenCalledWith(
      "auth0|123",
      "test@example.com",
      "Test"
    );
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("should return 500 on error", async () => {
    vi.spyOn(userModel, "findOrCreateUser").mockRejectedValue(new Error("DB fail"));

    const req = {
      auth: {
        payload: {
          sub: "auth0|123",
          "https://ai-reviewer.com/email": "test@example.com",
          "https://ai-reviewer.com/nickname": "Test",
        },
      },
    };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    await syncUserWithDatabase(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

describe("handleGetUser", () => {
  it("should return user when found", async () => {
    const mockUser = { auth0_id: "auth0|123", email: "test@example.com", nickname: "Test" };
    vi.spyOn(userModel, "getUserBySub").mockResolvedValue(mockUser as any);

    const req = { auth: { payload: { sub: "auth0|123" } } };
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() };

    await handleGetUser(req as any, res as any);

    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("should return 500 on error", async () => {
    vi.spyOn(userModel, "getUserBySub").mockRejectedValue(new Error("DB error"));

    const req = { auth: { payload: { sub: "auth0|123" } } };
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() };

    await handleGetUser(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

describe("handleGetAverageScore", () => {
  it("should return average score of selected user", async () => {
    const req = { auth: { payload: { sub: "auth0|123" } } };
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() };

    vi.spyOn(userModel, "getUserIdBySub").mockResolvedValue({ id: 1 });
    vi.spyOn(pool, "query").mockResolvedValueOnce({ rows: [{ avg: 99 }] } as any);

    await handleGetAverageScore(req as any, res as any);

    expect(res.json).toHaveBeenCalledWith({ averageScore: 99 });
  });
});
