<template>
  <div
    class="flex flex-shrink-0 border-t border-gray-200 p-4 dark:border-gray-700"
  >
    <a href="#" @click="onLogout" class="group block w-full flex-shrink-0">
      <div class="flex items-center">
        <div>
          <ArrowRightEndOnRectangleIcon class="h-6 w-6 rotate-180" />
        </div>
        <div
          class="ml-3 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-slate-300 dark:hover:text-gray-100"
        >
          Logout
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightEndOnRectangleIcon } from "@heroicons/vue/24/outline";
import router from "../plugins/router";
import { useAuthStore } from "../store/auth";

const onLogout = () => {
  useAuthStore().logout();

  router.push({ name: "Login" });
};
</script>
