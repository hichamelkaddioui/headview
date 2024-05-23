<template>
  <div class="flex flex-shrink-0 items-center px-4">
    <img class="h-8 w-auto" src="/headview.svg" alt="Headview" />
    <h3 class="ml-3 font-semibold">Headview</h3>
  </div>
  <nav class="mt-5 flex-1 space-y-1 bg-white px-2 dark:bg-slate-900">
    <router-link
      v-for="{ name, path, current, icon } in navigation"
      :key="name"
      :to="path"
      :class="[
        current
          ? 'bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-300'
          : 'text-gray-600 hover:bg-slate-50 hover:text-gray-900 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-gray-300',
        'group flex items-center rounded-xl px-2 py-2 text-sm font-medium',
      ]"
    >
      <component
        :is="icon"
        :class="[
          current
            ? 'text-indigo-500 dark:text-indigo-300'
            : 'text-gray-400 group-hover:text-gray-500 dark:text-slate-200 dark:group-hover:text-gray-300',
          'mr-3 h-6 w-6 flex-shrink-0',
        ]"
        aria-hidden="true"
      />
      {{ name }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { FunctionalComponent, computed } from "vue";
import { useRoute } from "vue-router";
import {
  HomeIcon,
  ServerStackIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";
import { routes } from "../plugins/router";

type NavigationItemName = "Dashboard" | "Machines" | "Users";

interface NavigationItem<K = NavigationItemName> {
  name: K;
  path: string;
  current: boolean;
  icon?: FunctionalComponent;
}

const route = useRoute();

const icons: Record<NavigationItemName, FunctionalComponent> = {
  Dashboard: HomeIcon,
  Machines: ServerStackIcon,
  Users: UsersIcon,
};

const getPathForItem = (name: NavigationItemName) => {
  const match = routes.find((route) => route.name === name);

  if (match) {
    return match.path;
  }

  const children = routes
    .filter(({ children }) => !!children)
    .flatMap(({ children }) => children);

  const childMatch = children.find((route) => route?.name === name);

  if (childMatch) {
    return childMatch.path;
  }

  return "";
};

const navigation = computed<NavigationItem[]>(() =>
  Object.entries(icons)
    .map(([n, icon]) => {
      const name = n as NavigationItemName;
      const path = getPathForItem(name);
      const current = route.matched.some((m) => m.name === name);

      return { name, path, current, icon };
    })
    .filter((e) => !!e),
);
</script>
