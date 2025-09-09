<script setup lang="ts">
import { computed } from "vue";
import { useReview } from "../composables/useReview";
import { useAuth } from "../composables/useAuth";
import Loader from "./Loader.vue";

const { parsedResponse, formattedReview, isLoading: reviewLoading } = useReview();
const { login, profile, isLoading: authLoading } = useAuth();

const isLoading = computed(() => reviewLoading.value || authLoading.value);
</script>

<template>
  <aside id="review-container">
    <template v-if="isLoading">
      <Loader />
    </template>

    <template v-else-if="!profile">
      <div class="logged-out-msg-wrapper">
        <p>Please log in to see the review result.</p>
        <button @click="login">Log in to get review</button>
      </div>
    </template>

    <template v-else-if="!parsedResponse">
      <div class="logged-msg-wrapper">
        <h2 class="loggged-in-msg">You are logged in.✅</h2>
        <h2>Submit github repository to get a review. 📝</h2>
      </div>
    </template>

    <template v-else>
      <h2>Review Result:</h2>
      <section class="review">
        <p><strong>Project Score:</strong> {{ parsedResponse.score }}</p>
        <div v-html="formattedReview"></div>
      </section>
    </template>
  </aside>
</template>

<style scoped>
.logged-msg-wrapper,
.logged-out-msg-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  height: 100%;
}

h2 {
  display: flex;
  justify-content: center;
  align-items: center;
}

aside {
  flex: 1;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  overflow-y: auto;
  max-height: 80vh;
  width: 60%;
}

.review {
  margin-top: 1.5rem;
  padding: 1rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  aside {
    width: 100%;
    max-height: none;
  }
}
</style>
