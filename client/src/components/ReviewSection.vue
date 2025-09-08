<script setup lang="ts">
import { useReview } from "../composables/useReview";

const { parsedResponse, formattedReview } = useReview();
</script>

<template>
  <aside id="review-container">
    <h2>Review Result:</h2>
    <section v-if="parsedResponse" class="review">
      <p><strong>Project Score:</strong> {{ parsedResponse.score }}</p>
      <div v-html="formattedReview"></div>
    </section>
  </aside>
</template>

<style scoped>
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
  text-align: left;
  line-height: 1.5;
}

@media (max-width: 768px) {
  aside {
    width: 100%;
    max-height: none;
  }
}
</style>
