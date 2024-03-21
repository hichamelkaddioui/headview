import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../components/DashboardView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: DashboardView,
      meta: { publique: true },
    },
  ],
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0 };
  },
});
