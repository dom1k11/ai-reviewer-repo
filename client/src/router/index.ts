import { createRouter, createWebHistory } from "vue-router";
import MainPageView from "../../views/MainPageView.vue";
import UserStatsView from "../../views/UserStatsView.vue";
import LandingPageView from "../../views/LandingPageView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "landing", component: LandingPageView },
    { path: "/app", name: "main", component: MainPageView },
    { path: "/stats", name: "stats", component: UserStatsView },
  ],
});

export default router;
