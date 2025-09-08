<!-- src/components/MainSection.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";

const { profile } = useAuth();
const emit = defineEmits<{
  (e: "send-request", repoUrl: string): void;
}>();

const repoUrl = ref("https://github.com/dom1k11/code-template");
</script>

<template>
  <main>
    <h1>Put your github link here and get the code review!</h1>
    <input
      id="repo-input"
      v-model="repoUrl"
      class="form-control"
      type="text"
      placeholder="https://github.com/user/repo"
    />
    <button id="get-review-btn" @click="emit('send-request', repoUrl)" :disabled="!profile">
      Get review
    </button>
    <slot />
  </main>
</template>

<style scoped>
#get-review-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}


main {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  width: 40%;
  min-width: 300px;
  margin: 0 auto;
}

input {
  margin: 1rem;
}
</style>
