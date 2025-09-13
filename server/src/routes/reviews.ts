import { Router } from "express";
import {
  handleGetReviewById,
  handleGetUserReviews,
  handlePostMessage,
} from "@/controllers/reviewController";
import { validateBody } from "@/middleware/validate";
import { PostURLSchema } from "@/controllers/validators/urlValidator";
import { checkJwt } from "@/middleware/auth0";

const router = Router();

router.post("/", checkJwt, validateBody(PostURLSchema), handlePostMessage);
router.get("/", checkJwt, handleGetUserReviews); //Add validation
router.get("/:id", checkJwt, handleGetReviewById); //Add Validation

export default router;
