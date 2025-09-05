import { Router } from "express";
import {
  handleGetAverageScore,
  handleGetUser,
  syncUserWithDatabase,
} from "@/controllers/userController";
import { checkJwt } from "../middleware/auth0";
import { validateAuthPayload } from "@/middleware/user";
import { createUserSchema, getUserSchema } from "@/controllers/validators/userValidator";
const router = Router();

router.post("/", checkJwt, validateAuthPayload(createUserSchema), syncUserWithDatabase);
router.get("/user", checkJwt, validateAuthPayload(getUserSchema), handleGetUser);
router.get("/average", checkJwt, handleGetAverageScore); //TODO: Call on frontend

export default router;
