import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../components/DashboardView.vue";
import MachinesView from "../components/MachinesView.vue";
import UsersView from "../components/UsersView.vue";

export const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: DashboardView,
  },
  {
    path: "/machines",
    name: "Machines",
    component: MachinesView,
  },
  {
    path: "/users",
    name: "Users",
    component: UsersView,
  },
] as const;

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0 };
  },
});
