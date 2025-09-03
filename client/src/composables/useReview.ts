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

export function useReview() {
  return { response, parsedResponse, formattedReview, sendRequest };
}
