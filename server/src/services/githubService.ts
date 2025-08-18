import { githubRequest } from "@/clients/githubClient";
import { parseRepoUrl } from "@/utils/getRepo";

export async function getRepoTree(owner: string, repo: string, branch = "main") {
  console.log("📁 [getRepoTree] owner:", owner, "repo:", repo, "branch:", branch);

  const request = await githubRequest("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
    owner,
    repo,
    tree_sha: branch,
    recursive: "1",
  });

  return request;
}

type GitHubBlobResponse = { content?: string };

export async function getFileContent(
  owner: string,
  repo: string,
  fileSha: string
): Promise<string> {
  console.log("📄 [getFileContent] owner:", owner, "repo:", repo, "sha:", fileSha);

  const blob: GitHubBlobResponse = await githubRequest(
    "GET /repos/{owner}/{repo}/git/blobs/{file_sha}",
    { owner, repo, file_sha: fileSha }
  );

  if (!blob.content) {
    throw new Error(`[getFileContent] missing content for sha: ${fileSha}`);
  }

  return Buffer.from(blob.content, "base64").toString("utf8");
}

export async function filterExts(owner: string, repo: string) {
  const tree = await getRepoTree(owner, repo);
  const ALLOWED_EXTS = [".ts", ".js", ".json", ".html", ".css", ".vue", ".tsx", ".jsx"];

  const files = tree.tree.filter(
    (f) =>
      f.type === "blob" &&
      ALLOWED_EXTS.some((ext) => f.path.endsWith(ext)) &&
      !f.path.includes("node_modules") &&
      !f.path.startsWith(".")
  );

  const parsedFiles = files.map((f) => ({
    sha: f.sha,
    path: f.path,
  }));
  return parsedFiles;
}
