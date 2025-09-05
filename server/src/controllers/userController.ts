import { findOrCreateUser, getAverageScore, getUserBySub } from "@/models/userModel";
import type { User } from "@/types/user";
import { AuthPayload } from "@/types/authPayload";
import { controller } from "@/utils/controllerWrapper";
import { getUserIdBySub } from "@/models/userModel";

export const syncUserWithDatabase = controller(async (req, res) => {
  const {
    sub,
    "https://ai-reviewer.com/email": email,
    "https://ai-reviewer.com/nickname": nickname,
  } = (req.auth?.payload ?? {}) as AuthPayload;

  if (!sub || !email || !nickname) {
    res.status(400).json({ error: "Missing user claims" });
    return;
  }

  const user: User = await findOrCreateUser(sub, email, nickname);
  res.json(user);
}, "syncUserWithDatabase");

export const handleGetUser = controller(async (req, res) => {
  const sub = (req.auth?.payload as { sub?: string })?.sub;
  console.log(sub);

  if (!sub) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const user: User | null = await getUserBySub(sub);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
}, "handleGetUser");

export const handleGetAverageScore = controller(async (_req, res) => {
  const sub = "auth0|689a2d6015b77d3add7f353e";

  const userId = await getUserIdBySub(sub);
  if (!userId) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const user = 1;
  const averageScore = await getAverageScore(user);
  console.log(averageScore);
  res.json({ averageScore });
  return;
}, "handleGetUser");
