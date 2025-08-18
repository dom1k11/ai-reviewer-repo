import { createRouter, createWebHistory } from "vue-router";
import MainPageView from "../../views/MainPageView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", name: "main", component: MainPageView }],
});

export default router;
