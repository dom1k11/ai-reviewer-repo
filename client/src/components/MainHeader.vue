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
      <RouterLink to="/"><button>Main Page</button></RouterLink>
      <RouterLink to="/stats"><button>Stats</button></RouterLink>
    </div>

    <div class="desktop-buttons">
      <button v-if="!profile" @click="login">Log in</button>
      <button v-else @click="handleLogout">Log out</button>
    </div>

    <div class="dropdown mobile-only">
      <button @click="toggleDropdown">☰ Menu</button>

      <div class="dropdown-menu" v-if="dropdownOpen">
        <button v-if="!profile" @click="login">Log in</button>
        <button v-else @click="handleLogout">Log out</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
button,
.nav-button {
  background-color: var(--color-primary, #4a90e2);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-left: 0.5rem;
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

.desktop-buttons button {
  background-color: var(--color-primary, #4a90e2);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-left: 0.5rem;
}

.desktop-buttons button:hover {
  background-color: var(--color-primary-hover, #357ab8);
}

.dropdown {
  position: relative;
}

.dropdown > button {
  background-color: var(--color-primary, #4a90e2);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 120%;
  display: flex;
  flex-direction: column;
  background-color: #333;
  border-radius: 6px;
  padding: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.dropdown-menu button {
  background-color: transparent;
  border: none;
  color: white;
  text-align: left;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.dropdown-menu button:hover {
  background-color: rgba(255, 255, 255, 0.1);
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
