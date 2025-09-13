import express from "express";
import cors from "cors";
import { CORS_ORIGIN, CORS_METHODS, CORS_HEADERS } from "./config";
import reviewRouter from "@/routes/reviews";
import userRoute from "@/routes/users";
const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: CORS_METHODS,
    allowedHeaders: CORS_HEADERS,
  })
);

app.use(express.json());

app.use("/review", reviewRouter);
app.use("/me", userRoute);

export default app;
