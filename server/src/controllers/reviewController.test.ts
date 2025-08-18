import { describe, it, vi, expect } from "vitest";

import { handleGetUserReviews, handlePostMessage } from "@/controllers/reviewController";
import { reviewAndStoreRepo } from "@/services/reviewService";
import { getReviewById, getReviewsByUserId } from "@/models/reviewModel";
import { getUserIdBySub } from "@/models/userModel";

vi.mock("@/services/reviewService");
vi.mock("@/models/userModel");
vi.mock("@/models/reviewModel");

describe("handlePostMessage", () => {
  const mockRes = () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    return res;
  };

  it("should return 201 and result when successful", async () => {
    const mockResult = { review: "nice repo" };
    (reviewAndStoreRepo as any).mockResolvedValue(mockResult);

    const req = {
      auth: { payload: { sub: "auth0|123" } },
      body: { repoUrl: "https://github.com/dom1k11/project" },
    };

    const res = mockRes();

    await handlePostMessage(req as any, res as any);

    expect(reviewAndStoreRepo).toHaveBeenCalledWith({
      sub: "auth0|123",
      repoUrl: "https://github.com/dom1k11/project",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  it("should return 401 if sub is missing", async () => {
    const req = { auth: {}, body: { repoUrl: "url" } };
    const res = mockRes();

    await handlePostMessage(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
  });

  it("should return 400 if repoUrl is missing", async () => {
    const req = {
      auth: { payload: { sub: "auth0|123" } },
      body: {},
    };
    const res = mockRes();

    await handlePostMessage(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "repoUrl required" });
  });

  it("should return 500 if reviewAndStoreRepo throws", async () => {
    (reviewAndStoreRepo as any).mockRejectedValue(new Error("DB Fail"));

    const req = {
      auth: { payload: { sub: "auth0|123" } },
      body: { repoUrl: "url" },
    };
    const res = mockRes();

    await handlePostMessage(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

describe("handleGetUserReviews", () => {
  const mockRes = () => {
    return {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  };

  it("should return 200 and user reviews", async () => {
    const req = {
      auth: { payload: { sub: "auth0|123" } },
    };

    const res = mockRes();

    (getUserIdBySub as any).mockResolvedValue({ id: 1 });

    (getReviewsByUserId as any).mockResolvedValue([
      {
        id: 123,
        user_id: 1,
        repo_id: 2,
        score: 85,
        created_at: new Date(),
      },
    ]);

    await handleGetUserReviews(req as any, res as any);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith([
      {
        id: 123,
        user_id: 1,
        repo_id: 2,
        score: 85,
        created_at: expect.any(Date),
      },
    ]);
  });

  it("should return 404 if user is not found", async () => {
    const req = {
      auth: { payload: { sub: "auth0|notfound" } },
    };
    const res = mockRes();

    (getUserIdBySub as any).mockResolvedValue(null);

    await handleGetUserReviews(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });
});
