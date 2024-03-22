<template>
  <div class="flex flex-shrink-0 items-center px-4">
    <img class="h-8 w-auto" src="/headview.svg" alt="Headview" />
    <h3 class="ml-3 font-semibold">Headview</h3>
  </div>
  <nav class="mt-5 flex-1 space-y-1 bg-white px-2">
    <router-link
      v-for="{ name, path, current, icon } in navigation"
      :key="name"
      :to="path"
      :class="[
        current
          ? 'bg-gray-100 text-indigo-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        'group flex items-center rounded-xl px-2 py-2 text-sm font-medium',
      ]"
    >
      <component
        :is="icon"
        :class="[
          current
            ? 'text-indigo-500'
            : 'text-gray-400 group-hover:text-gray-500',
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
import { type RouteName, routes } from "../plugins/router";

export interface NavigationItem {
  name: RouteName;
  path: string;
  current: boolean;
  icon?: FunctionalComponent;
}

const route = useRoute();

const icons: Partial<Record<RouteName, FunctionalComponent>> = {
  Dashboard: HomeIcon,
  Machines: ServerStackIcon,
  Users: UsersIcon,
};
const navigation = computed<NavigationItem[]>(() =>
  routes
    .map((item) => {
      const { name, path } = item;
      const current = route.matched.some((m) => m.name === name);
      const icon = icons[name];

      return { name, path, current, icon };
    })
    .filter(({ icon }) => !!icon),
);
</script>