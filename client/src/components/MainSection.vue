<!-- src/components/MainSection.vue -->
<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "send-request", repoUrl: string): void;
}>();

const repoUrl = ref("https://github.com/dom1k11/code-template");
</script>

<template>
  <main>
    <h1>Put your github link here and get the code review!</h1>
    <input
      v-model="repoUrl"
      class="form-control"
      type="text"
      placeholder="https://github.com/user/repo"
    />
    <button @click="emit('send-request', repoUrl)">Get review</button>
    <slot />
  </main>
</template>

<style scoped>
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

button {
  background: var(--color-primary);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 50%;
  height: 3rem;
  font-size: 1rem;
  margin: 1.5rem;
}

button:hover {
  transform: var(--button-raiseY);
  background-color: var(--color-primary-hover);
  box-shadow: var(--button-hover-shadow);
}
</style>
