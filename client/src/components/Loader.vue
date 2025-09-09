<script setup lang="ts"></script>

<template>
  <div class="spinner-wrapper">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #ccc;
  border-top-color: #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
