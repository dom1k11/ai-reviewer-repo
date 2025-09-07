<script setup lang="ts">
import { onMounted } from "vue";
import { useAuth } from "../src/composables/useAuth";
import { useReview } from "../src/composables/useReview";
import Header from "../src/components/MainHeader.vue";

const { getToken } = useAuth();
const { userReviews, fetchUserReviews } = useReview();

onMounted(async () => {
  const token = await getToken();
  console.log("user token", token);
  await fetchUserReviews(token);
});
</script>

<template>
  <Header></Header>
  <div>
    <h2>User Reviews</h2>
    <ul v-if="userReviews.length">
      <li v-for="review in userReviews" :key="review.id">
       Id: {{ review.id }} Repository id {{ review.repo_id }} - Score: {{ review.score }}
      </li>
    </ul>
    <p v-else>No reviews yet</p>
  </div>
</template>
