import { createRouter, createWebHistory } from "vue-router";
import MainPageView from "../../views/MainPageView.vue";
import UserStatsView from "../../views/UserStatsView.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "main", component: MainPageView },
    { path: "/stats", name: "stats", component: UserStatsView },
  ],
});

export default router;
