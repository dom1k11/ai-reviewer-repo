import { findOrCreateUser, getAverageScore, getUserBySub } from "@/models/userModel";
import type { Request, Response } from "express";
import type { User } from "@/types/user";
import { AuthPayload } from "@/models/authPayload";

export async function syncUserWithDatabase(req: Request, res: Response): Promise<void> {
  try {
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
  } catch (err) {
    console.error("Error syncing user:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function handleGetUser(req: Request, res: Response): Promise<void> {
  try {
    const sub = (req.auth?.payload as { sub?: string })?.sub;

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
  } catch (err) {
    console.error("Error getting user:", err);
    res.status(500).json({ error: "Server error" });
  }
}

import { getUserIdBySub } from "@/models/userModel";
export async function handleGetAverageScore(req: Request, res: Response) {
  // const sub = req.auth?.payload.sub;
  const sub = "auth0|689a2d6015b77d3add7f353e";

  const userId = await getUserIdBySub(sub);
  if (!userId) return res.status(404).json({ error: "User not found" });

  const user = 1;
  try {
    const averageScore = await getAverageScore(user);
    console.log(averageScore);
    return res.json({ averageScore })
  } catch (err) {
    console.error("Error getting average score", err);
    res.status(500).json({ error: "Server error" });
  }
}
