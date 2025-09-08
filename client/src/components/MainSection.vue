<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
import { useValidation } from "../composables/useValidation";

const { profile } = useAuth();
const emit = defineEmits<{
  (e: "send-request", repoUrl: string): void;
}>();

const repoUrl = ref("https://github.com/dom1k11/code-template");
const { error, validateRepoUrl } = useValidation();

function validateAndSend() {
  const validUrl = validateRepoUrl(repoUrl.value);
  if (validUrl) {
    emit("send-request", validUrl);
  }
}
</script>

<template>
  <main>
    <h1>Put your github link here and get the code review!</h1>
    <label for="repo-input">Your repository:</label>
    <input
      id="repo-input"
      v-model="repoUrl"
      class="form-control"
      type="text"
      placeholder="https://github.com/user/repo"
    />
    <p v-if="error" class="error-msg">{{ error }}</p>

    <button id="get-review-btn" @click="validateAndSend" :disabled="!profile">Get review</button>
    <slot />
  </main>
</template>

<style scoped>
label {
  align-self: flex-start;
  margin: 0.5rem 0 0.25rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition:
    border 0.2s ease,
    box-shadow 0.2s ease;
  margin-bottom: 0.5rem;
}

.error-msg {
  color: red;
  font-size: 0.9rem;
  margin: 0.25rem 0 0.75rem 0;
  align-self: flex-start;
}

button {
  width: 70%;
  margin: 0.5rem 0;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
}
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
</style>
