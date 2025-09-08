<script setup lang="ts">
import { useAuth } from "../src/composables/useAuth";
import { useReview } from "../src/composables/useReview";
import MainSection from "../src/components/MainSection.vue";
import ReviewSection from "../src/components/ReviewSection.vue";
import Header from "../src/components/MainHeader.vue";
import ProjectRequirements from "../src/components/ProjectRequirements.vue";

const { login, handleLogout, profile, getToken } = useAuth();
const { parsedResponse, formattedReview, sendRequest } = useReview();

async function handleSend(repoUrl: string) {
  const token = await getToken();
  await sendRequest(token, repoUrl);
}
</script>

<template>
  <Header></Header>

  <div class="main-box">
    <MainSection @send-request="handleSend">
      <ProjectRequirements />
    </MainSection>
    <ReviewSection />
  </div>
</template>

<style scoped>
.main-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem;
  width: 100%;
}

@media (max-width: 768px) {
  .main-box {
    flex-direction: column;
    width: 100%;
    padding: 1rem;
    gap: 1rem;
  }
}
</style>
