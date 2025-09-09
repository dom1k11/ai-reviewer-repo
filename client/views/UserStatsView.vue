<script setup lang="ts">
import { onMounted } from "vue";
import { useAuth } from "../src/composables/useAuth";
import { useReview } from "../src/composables/useReview";
import Header from "../src/components/MainHeader.vue";
import Loader from "../src/components/Loader.vue";

const { getToken } = useAuth();
const { userReviews, fetchUserReviews, isLoading } = useReview();

onMounted(async () => {
  const token = await getToken();
  await fetchUserReviews(token);
});
</script>

<template>
  <Header />
  <div class="reviews-container">
    <h2>Your reviews</h2>

    <Loader v-if="isLoading" />

    <ul v-else-if="userReviews.length" class="reviews-list">
      <li v-for="review in userReviews" :key="review.id" class="review-card">
        <p><strong>Id:</strong> {{ review.id }}</p>
        <p><strong>Repository id:</strong> {{ review.repo_id }}</p>
        <p><strong>Score:</strong> {{ review.score }}</p>
        <p><strong>Date:</strong> {{ review.created_at }}</p>
      </li>
    </ul>

    <p v-else class="empty-msg">No reviews yet</p>
  </div>
</template>

<style scoped>
p {
  padding: 0;
  margin: 0;
}
.reviews-container {
  padding: 0.5rem;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin: 1.5rem;
}

.reviews-list {
  list-style: none;

  display: grid;
  gap: 1rem;
}

.review-card {
  padding: 1rem;
  border-radius: 8px;
  box-shadow: var(--shadow, 0 2px 6px rgba(0, 0, 0, 0.1));
  background: #fff;
  transition: transform 0.2s ease;
}

.empty-msg {
  text-align: center;
  font-style: italic;
  color: #888;
}
</style>
