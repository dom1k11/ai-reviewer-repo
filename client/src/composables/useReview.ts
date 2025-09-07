// src/composables/useReview.ts
import { ref, computed } from "vue";

const response = ref("");
const parsedResponse = ref<{ review: string; score: number } | null>(null);

async function sendRequest(token: string, repoUrl: string) {
  const res = await fetch("http://localhost:3000/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ repoUrl }),
  });

  const data = await res.json();
  response.value = JSON.stringify(data, null, 2);
  parsedResponse.value = data;
}

const formattedReview = computed(() =>
  parsedResponse.value?.review ? parsedResponse.value.review.replace(/\n/g, "<br>") : ""
);

const userReviews = ref<Array<{ id: number; user_id: number; repo_id: number; score: number }>>([]);

async function fetchUserReviews(token: string) {
  const res = await fetch("http://localhost:3000/review", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user reviews");
  }

  const data = await res.json();
  userReviews.value = data;
}

export function useReview() {
  return { response, parsedResponse, formattedReview, userReviews, sendRequest, fetchUserReviews };
}
