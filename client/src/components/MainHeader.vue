<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";

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
    </div>

    <div class="dropdown">
      <button @click="toggleDropdown">☰ Menu</button>

      <div class="dropdown-menu" v-if="dropdownOpen">
        <button @click="login">Log in</button>
        <button @click="handleLogout">Log out</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
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

@media (max-width: 768px) {
  header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .dropdown-menu {
    right: auto;
    left: 0;
  }
}
</style>
