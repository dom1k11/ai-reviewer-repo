<script setup lang="ts">
import { useReview } from "../composables/useReview";

const { parsedResponse, formattedReview } = useReview();
</script>

<template>
  <aside>
    <h2>Review Result:</h2>
    <section v-if="parsedResponse" class="review">
      <p><strong>Project Score:</strong> {{ parsedResponse.score }}</p>
      <div v-html="formattedReview"></div>
    </section>
  </aside>
</template>

<style scoped>
aside {
  background: var(--color-bg);
  width: 50%;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  overflow: auto;
  max-height: 80vh;
}
.review {
  margin-top: 30px;
  padding: 20px;
  max-width: 600px;
  align-items: center;
  justify-content: center;
  text-align: left;
  line-height: 1.5;
}

aside {
  width: 100%;
  margin-top: 1rem;
  max-height: none;
}

@media (max-width: 768px) {
  main {
    margin-top: 0;
    flex: none;
    width: 100%;
  }
}
</style>
