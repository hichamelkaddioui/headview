import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../components/DashboardView.vue";
import MachineDetail from "../components/MachineDetail.vue";
import MachinesList from "../components/MachinesList.vue";
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
    children: [
      { path: "", name: "Machines list", component: MachinesList },
      { path: ":name", name: "Machine details", component: MachineDetail },
    ],
  },
  {
    path: "/users",
    name: "Users",
    component: UsersView,
  },
];

export type RouteName = (typeof routes)[number]["name"];

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
