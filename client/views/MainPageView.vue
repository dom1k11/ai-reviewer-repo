<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuth } from "../src/composables/useAuth";

const { login, handleLogout, user, isAuthenticated, profile, fetchMe, getToken } = useAuth();

const response = ref("");
const parsedResponse = ref<{ review: string; score: number } | null>(null);

async function sendRequest() {
  const token = await getToken();

  const res = await fetch("http://localhost:3000/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      repoUrl: "https://github.com/dom1k11/code-template",
    }),
  });

  const data = await res.json();
  response.value = JSON.stringify(data, null, 2);
  parsedResponse.value = data;
}

const formattedReview = computed(() =>
  parsedResponse.value ? parsedResponse.value.review.replace(/\n/g, "<br>") : ""
);
</script>

<template>
  <div>
    <header>
      <button @click="login">Log in</button>
      <button @click="handleLogout">Log out</button>
      <button @click="fetchMe" style="background-color: gray">Check /me</button>
    </header>

    <main>
      <div class="user-info" v-if="isAuthenticated">
        <h2>User Profile</h2>
        <ul>
          <li v-for="(value, key) in user" :key="key">
            <strong>{{ key }}:</strong>
            <span v-if="typeof value !== 'object'">{{ value }}</span>
            <pre v-else>{{ JSON.stringify(value, null, 2) }}</pre>
          </li>
        </ul>
      </div>

      <button @click="sendRequest">Get review</button>

      <section v-if="parsedResponse" class="review">
        <h2>Review Result</h2>
        <p><strong>Score:</strong> {{ parsedResponse.score }}</p>
        <div v-html="formattedReview"></div>
      </section>
    </main>
  </div>
</template>

<style scoped>
button {
  margin: 5px;
}
.user-info {
  margin: 20px;
}
header {
  display: flex;
  justify-content: end;
  align-items: center;
  background-color: aliceblue;
  padding: 20px;
}
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.review {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ccc;
  max-width: 600px;
  text-align: left;
  line-height: 1.5;
}
</style>
