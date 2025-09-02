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

    <ul>
      <li>Ensure that your code is on main branch</li>
      <li>Ensure that your repository is public</li>
      <li>Mock project requirement</li>
      <li>Mock project description</li>
    </ul>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 2;
  box-shadow: var(--shadow);
  width: 50%;
}

button {
  background: var(--color-primary);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}
button:hover {
  transform: var(--button-raiseY);
  background-color: var(--color-primary-hover);
  box-shadow: var(--button-hover-shadow);
}
</style>
