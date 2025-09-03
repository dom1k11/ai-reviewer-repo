<script setup lang="ts">
import { useAuth } from "../src/composables/useAuth";
import { useReview } from "../src/composables/useReview";
import MainSection from "../src/components/MainSection.vue";
import ReviewSection from "../src/components/reviewSection.vue";

const { login, handleLogout, profile, getToken } = useAuth();
const { parsedResponse, formattedReview, sendRequest } = useReview();

async function handleSend(repoUrl: string) {
  const token = await getToken();
  await sendRequest(token, repoUrl);
}
</script>

<template>
  <header>
    <div class="user-name">{{ profile ? "Welcome, " + profile.nickname : "" }}</div>
    <button @click="login">Log in</button>
    <button @click="handleLogout">Log out</button>
  </header>

  <div class="main-box">
    <MainSection @send-request="handleSend" />
    <ReviewSection></ReviewSection>
  </div>
</template>

<style scoped>
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

.user-name {
  margin: 20px;
  color: white;
}
header {
  display: flex;
  justify-content: end;
  align-items: center;
  background-color: rgb(20, 20, 20);
  padding: 20px;
}

.main-box {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 2rem auto;
  box-sizing: border-box;
  border-radius: 20px;
  gap: 2rem;
  padding: 2rem;
  background: var(--color-main);
}

@media (max-width: 768px) {
  .main-box {
    flex-direction: column;
    width: 100%;
    padding: 1rem;
  }

  main {
    margin-top: 0;
    flex: none;
    width: 100%;
  }
}
</style>
