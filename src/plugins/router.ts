import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import MachineDetail from "../views/MachineDetail.vue";
import MachinesList from "../views/MachinesList.vue";
import MachinesView from "../views/MachinesView.vue";
import UsersView from "../views/UsersView.vue";

const machineRoutes = [
  { path: "", name: "Machines list", component: MachinesList },
  { path: ":id", name: "Machine details", component: MachineDetail },
];

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
    children: machineRoutes,
  },
  {
    path: "/users",
    name: "Users",
    component: UsersView,
  },
] as const;

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
