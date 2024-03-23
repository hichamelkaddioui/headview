import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import HomeView from "../views/HomeView.vue";
import MachineDetail from "../views/MachineDetail.vue";
import MachinesList from "../views/MachinesList.vue";
import UsersView from "../views/UsersView.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: DashboardView,
      },
      {
        path: "/machines",
        name: "Machines",
        children: [
          {
            path: "",
            name: "Machines list",
            component: MachinesList,
          },
          {
            path: ":id",
            name: "Machine details",
            component: MachineDetail,
          },
        ],
      },
      {
        path: "/users",
        name: "Users",
        component: UsersView,
      },
    ],
  },
];

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
