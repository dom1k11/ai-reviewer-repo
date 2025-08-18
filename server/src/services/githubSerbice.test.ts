import { describe, it, expect, vi, type Mock } from "vitest";
import { getRepoTree } from "./githubService";
import { githubRequest } from "@/clients/githubClient";
vi.mock("@/clients/githubClient", () => ({
  githubRequest: vi.fn(),
}));

describe("To make sure that github services are working", () => {
  it("should get proper RepoTree on selected owener and repo", async () => {
    const mockResponse = {
      tree: [
        { path: "index.js", sha: "12345", type: "blob" },
        { path: "app.ts", sha: "67890", type: "blob" },
      ],
    };

    (githubRequest as Mock).mockResolvedValue(mockResponse);

    const result = await getRepoTree("dom1k11", "code-template");

    expect(result).toEqual(mockResponse);
    expect(githubRequest).toHaveBeenCalledWith("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
      owner: "dom1k11",
      repo: "code-template",
      tree_sha: "main",
      recursive: "1",
    });
  });
});
