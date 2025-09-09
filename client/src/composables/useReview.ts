// src/composables/useReview.ts
import { ref, computed } from "vue";
import { Review } from "@/types/review";

const response = ref("");
const parsedResponse = ref<{ review: string; score: number } | null>(null);
const userReviews = ref<Review[]>([]);
const isLoading = ref(false);

async function sendRequest(token: string, repoUrl: string) {
  try {
    isLoading.value = true;

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
  } catch (err) {
    console.error("Error in sendRequest:", err);
  } finally {
    isLoading.value = false;
  }
}

const formattedReview = computed(() =>
  parsedResponse.value?.review ? parsedResponse.value.review.replace(/\n/g, "<br>") : ""
);

async function fetchUserReviews(token: string) {
  try {
    isLoading.value = true;

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
  } catch (err) {
    console.error("Error in fetchUserReviews:", err);
  } finally {
    isLoading.value = false;
  }
}

export function useReview() {
  return {
    response,
    parsedResponse,
    formattedReview,
    userReviews,
    isLoading,
    sendRequest,
    fetchUserReviews,
  };
}
