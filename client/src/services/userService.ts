import { apiRequest } from "../utils/api";

export function fetchMe(token: string) {
  return apiRequest("POST", "/me", token);
}

export function getUser(token: string) {
  return apiRequest("GET", "/me/user", token);
}

export function getAverageScore(token: string) {
  return apiRequest("GET", "/me/average", token);
}
