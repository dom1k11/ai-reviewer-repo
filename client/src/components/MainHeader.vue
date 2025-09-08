<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
import { RouterLink } from "vue-router";
const { login, handleLogout, profile } = useAuth();
const dropdownOpen = ref(false);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}
</script>

<template>
  <header>
    <div class="user-name">
      {{ profile ? "Welcome, " + profile.nickname : "" }}
      <span v-if="profile"> - Your average score: {{ profile.averageScore ?? "N/A" }}</span>
    </div>

    <div class="desktop-buttons">
      <RouterLink to="/"><button>Main Page</button></RouterLink>

      <RouterLink to="/stats"><button>Stats</button></RouterLink>
      <button v-if="!profile" @click="login">Log in</button>
      <button v-else @click="handleLogout">Log out</button>
    </div>

    <div class="dropdown mobile-only">
      <button @click="toggleDropdown">☰ Menu</button>

      <div class="dropdown-menu" v-if="dropdownOpen">
        <RouterLink to="/"><button>Main Page</button></RouterLink>
        <RouterLink to="/stats"><button>Stats</button></RouterLink>
        <button v-if="!profile" @click="login">Log in</button>
        <button v-else @click="handleLogout">Log out</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
button {
  margin: 0 0.5rem 0 0.5rem;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(20, 20, 20);
  padding: 1rem 2rem;
  position: relative;
}

.user-name {
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 120%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #333;
  border-radius: 6px;
  padding: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 10;
  align-items: center;
}
.dropdown-menu button {
  min-width: 150px;
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  justify-content: center;
}

.desktop-buttons {
  display: flex;
}

.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .desktop-buttons {
    display: none;
  }
  .mobile-only {
    display: block;
  }
}
</style>
