import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { reviewAndStoreRepo } from "@/services/reviewService";
import * as userModel from "@/models/userModel";
import * as githubService from "@/services/githubService";
import * as openaiService from "@/services/openaiService";
import * as reviewModel from "@/models/reviewModel";

vi.mock("@/models/userModel", () => ({
  getUserBySub: vi.fn(),
}));
vi.mock("@/services/githubService", () => ({
  filterExts: vi.fn(),
  getFileContent: vi.fn(),
}));
vi.mock("@/services/openaiService", () => ({
  generateReview: vi.fn(),
  extractScoreFromReview: vi.fn(),
}));
vi.mock("@/models/reviewModel", () => ({
  insertReview: vi.fn(),
}));

describe("reviewAndStoreRepo", () => {
  const baseArgs = {
    sub: "auth0|123",
    repoUrl: "https://github.com/dom1k11/code-template",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should run full review process and insert review", async () => {
    (userModel.getUserBySub as Mock).mockResolvedValue({ id: 1 });
    (githubService.filterExts as Mock).mockResolvedValue([
      { sha: "sha1", path: "index.js" },
      { sha: "sha2", path: "App.vue" },
    ]);
    (githubService.getFileContent as Mock)
      .mockResolvedValueOnce("console.log('hi')")
      .mockResolvedValueOnce("export default {}");
    (openaiService.generateReview as Mock).mockResolvedValue("Review\nScore: 85");
    (openaiService.extractScoreFromReview as Mock).mockReturnValue(85);
    (reviewModel.insertReview as Mock).mockResolvedValue(undefined);

    const result = await reviewAndStoreRepo(baseArgs);

    expect(result).toEqual({
      review: "Review\nScore: 85",
      score: 85,
    });

    expect(userModel.getUserBySub).toHaveBeenCalledWith("auth0|123");
    expect(githubService.filterExts).toHaveBeenCalled();
    expect(githubService.getFileContent).toHaveBeenCalledTimes(2);
    expect(openaiService.generateReview).toHaveBeenCalled();
    expect(reviewModel.insertReview).toHaveBeenCalledWith(1, 0, 85);
  });

  it("should throw if user not found", async () => {
    (userModel.getUserBySub as Mock).mockResolvedValue(null);

    await expect(reviewAndStoreRepo(baseArgs)).rejects.toThrow("Failed to process review");
  });

  it("should throw if no supported files", async () => {
    (userModel.getUserBySub as Mock).mockResolvedValue({ id: 1 });
    (githubService.filterExts as Mock).mockResolvedValue([]);

    await expect(reviewAndStoreRepo(baseArgs)).rejects.toThrow("Failed to process review");
  });

  it("should throw if generateReview fails", async () => {
    (userModel.getUserBySub as Mock).mockResolvedValue({ id: 1 });
    (githubService.filterExts as Mock).mockResolvedValue([{ sha: "sha1", path: "index.js" }]);
    (githubService.getFileContent as Mock).mockResolvedValue("code");
    (openaiService.generateReview as Mock).mockRejectedValue(new Error("AI down"));

    await expect(reviewAndStoreRepo(baseArgs)).rejects.toThrow("Failed to process review");
  });
});
