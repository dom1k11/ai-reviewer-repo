import { auth } from "express-oauth2-jwt-bearer";
const auth0_audience = process.env.AUTH0_AUDIENCE || "";
const auth0issuerbaseurl = process.env.AUTH0_ISSUER_BASE_URL;
export const checkJwt = auth({
  audience: auth0_audience,
  issuerBaseURL: auth0issuerbaseurl,
  tokenSigningAlg: "RS256",
});
