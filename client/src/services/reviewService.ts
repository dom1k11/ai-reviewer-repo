import { apiRequest } from "../utils/api";

export function getUserReviews(token: string) {
  return apiRequest("GET", "/review", token);
}
