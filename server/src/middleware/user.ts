import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
export function validateAuthPayload(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.auth?.payload);

    if (!parsed.success) {
      console.error("❌ Zod validation failed:", parsed.error.format());
      return res.status(400).json({
        error: "Invalid payload",
        issues: parsed.error.issues,
      });
    }

    req.validatedUser = parsed.data;
    next();
  };
}
