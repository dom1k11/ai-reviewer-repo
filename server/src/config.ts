export const CORS_ORIGIN = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:5173"];

export const CORS_METHODS = process.env.CORS_METHODS
  ? process.env.CORS_METHODS.split(",")
  : ["GET", "POST"];

export const CORS_HEADERS = process.env.CORS_HEADERS
  ? process.env.CORS_HEADERS.split(",")
  : ["Content-Type", "Authorization"];
