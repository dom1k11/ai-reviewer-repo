import { auth } from "express-oauth2-jwt-bearer";
import type { Request, Response, NextFunction } from "express";

const auth0_audience = process.env.AUTH0_AUDIENCE || "";
const auth0issuerbaseurl = process.env.AUTH0_ISSUER_BASE_URL;

export const checkJwt =
  process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
    ? (req: Request, _res: Response, next: NextFunction) => {
       req.auth = {
  payload: { sub: "auth0|689a2d6015b77d3add7f353e" }
} as unknown as typeof req.auth;

        next();
      }
    : auth({
        audience: auth0_audience,
        issuerBaseURL: auth0issuerbaseurl,
        tokenSigningAlg: "RS256",
      });
