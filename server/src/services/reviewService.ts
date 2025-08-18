import { generateReview, extractScoreFromReview } from "@/services/openaiService";
import { getFileContent, filterExts } from "@/services/githubService";
import { parseRepoUrl } from "@/utils/getRepo";
import { insertReview } from "@/models/reviewModel";
import { getUserBySub } from "@/models/userModel";

export async function reviewAndStoreRepo({ sub, repoUrl }: { sub: string; repoUrl: string }) {
  const user = await getUserBySub(sub);
  if (!user) throw new Error("User not found");

  const userId = user.id;
  const { owner, repo } = parseRepoUrl(repoUrl);

  const files = await filterExts(owner, repo);
  if (files.length === 0) {
    throw new Error(`No supported files found in ${owner}/${repo}`);
  }

  const codes = await Promise.all(files.map(({ sha }) => getFileContent(owner, repo, sha)));

  const fullCode = codes.join("\n\n/* --- next file --- */\n\n");
  console.log(fullCode);
  const review = await generateReview(fullCode);
  const score = extractScoreFromReview(review) ?? 0;

  const repoId = 0;
  await insertReview(userId, repoId, score);

  return { review, score };
}
