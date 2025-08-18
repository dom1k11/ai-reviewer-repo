import { syncUserWithDatabase, handleGetUser } from "./userController";
import * as userModel from "@/models/userModel";
import { describe, it, vi, expect } from "vitest";

describe("syncUserWithDatabase", () => {
  it("should call findOrCreateUser and return the user", async () => {
    const mockUser = { id: 1, email: "test@example.com", nickname: "Test" };
    vi.spyOn(userModel, "findOrCreateUser").mockResolvedValue(mockUser);

    const req = {
      auth: {
        payload: {
          sub: "auth0|123",
          "https://ai-reviewer.com/email": "test@example.com",
          "https://ai-reviewer.com/nickname": "Test",
        },
      },
    };
    const res = { json: vi.fn() };

    await syncUserWithDatabase(req, res);

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
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() };

    await syncUserWithDatabase(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
  });
});

describe("handleGetUser", () => {
  it("should return user when found", async () => {
    const mockUser = { auth0_id: "auth0|123", email: "test@example.com", nickname: "Test" };
    vi.spyOn(userModel, "getUserBySub").mockResolvedValue(mockUser);

    const req = {
      auth: {
        payload: {
          sub: "auth0|123",
        },
      },
    };

    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() };

    await handleGetUser(req as any, res as any);

    expect(res.json).toHaveBeenCalledWith(mockUser);
    expect(res.status).not.toHaveBeenCalledWith(404);
  });

  it("should return the exact user object from getUserBySub", async () => {
    const mockUser = {
      auth0_id: "auth0|689b6e46a51b6e7534dd2455",
      email: "test@example.com",
      nickname: "Test",
    };

    vi.spyOn(userModel, "getUserBySub").mockResolvedValue(mockUser);

    const req = {
      auth: {
        payload: {
          sub: "auth0|123",
        },
      },
    };

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    };

    await handleGetUser(req, res);

    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("should return 500 on error", async () => {
    vi.spyOn(userModel, "getUserBySub").mockRejectedValue(new Error("DB error"));

    const req = {
      auth: {
        payload: {
          sub: "auth0|123",
        },
      },
    };

    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() };

    await handleGetUser(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
  });
});
