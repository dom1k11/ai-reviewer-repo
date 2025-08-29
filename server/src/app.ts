import express from "express";
import cors from "cors";

import reviewRouter from "@/routes/reviews";
import userRoute from "@/routes/users";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/review", reviewRouter);
app.use("/me", userRoute);

export default app;
