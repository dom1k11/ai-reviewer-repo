import { Response, Request } from "express";
import { reviewAndStoreRepo } from "@/services/reviewService";
import { getUserIdBySub } from "@/models/userModel";
import { getReviewById, getReviewsByUserId } from "@/models/reviewModel";
import { controller } from "@/utils/controllerWrapper";
export const handlePostMessage = controller(async (req, res) => {
  const sub = req.auth?.payload?.sub;
  if (!sub) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { repoUrl } = req.body;
  if (!repoUrl) {
    res.status(400).json({ error: "repoUrl required" });
    return;
  }

  const result = await reviewAndStoreRepo({ sub, repoUrl });
  res.status(201).json(result);
}, "handlePostMessage");

export const handleGetUserReviews = controller(async (req, res) => {
  const sub = req.auth?.payload.sub;

  if (!sub) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const userId = await getUserIdBySub(sub);
  if (!userId) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const reviews = await getReviewsByUserId(userId.id);
  res.json(reviews);
  console.log(reviews);
}, "handleGetUserReviews");

export const handleGetReviewById = controller(async (req, res) => {
  const reviewId = Number(req.params.id);
  if (isNaN(reviewId)) {
    res.status(400).json({ error: "Invalid review ID" });
    return;
  }

  const review = await getReviewById(reviewId);
  if (!review) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  res.json(review);
}, "handleGetReviewById");
