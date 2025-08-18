import { Response, Request } from "express";
import { reviewAndStoreRepo } from "@/services/reviewService";
import { getUserIdBySub } from "@/models/userModel";
import { getReviewById, getReviewsByUserId } from "@/models/reviewModel";
export async function handlePostMessage(req: Request, res: Response) {
  try {
    const sub = req.auth?.payload?.sub;
    if (!sub) return res.status(401).json({ error: "Unauthorized" });
    const { repoUrl } = req.body;
    if (!repoUrl) return res.status(400).json({ error: "repoUrl required" });

    const result = await reviewAndStoreRepo({ sub, repoUrl });

    res.status(201).json(result);
  } catch (err) {
    console.error("💥 POST /messages:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function handleGetUserReviews(req: Request, res: Response) {
  try {
    const sub = req.auth?.payload.sub;
    const mockSub = "auth0|689a2d6015b77d3add7f353e"; //TODO: change to real sub

    if (!mockSub) return res.status(401).json({ error: "Unauthorized" });

    const userId = await getUserIdBySub(mockSub);
    if (!userId) return res.status(404).json({ error: "User not found" });

    const reviews = await getReviewsByUserId(userId.id);
    res.json(reviews);
    console.log(reviews);
  } catch (err) {
    console.error("💥 GET /review:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function handleGetReviewById(req: Request, res: Response) {
  try {
    const reviewId = Number(req.params.id);
    if (isNaN(reviewId)) return res.status(400).json({ error: "Invalid review ID" });

    const review = await getReviewById(reviewId);
    if (!review) return res.status(404).json({ error: "Review not found" });

    res.json(review);
  } catch (err) {
    console.error("💥 GET /review/:id", err);
    res.status(500).json({ error: "Server error" });
  }
}
