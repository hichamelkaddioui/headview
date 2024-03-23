<template>
  <button
    type="button"
    class="my-12 inline-flex items-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    <UserPlusIcon class="-ml-1 mr-2 h-6 w-6" aria-hidden="true" />
    Create new user
  </button>

  <div class="rounded-lg border border-gray-300 bg-white sm:rounded-2xl">
    <ul role="list" class="-my-5 divide-y divide-gray-200 p-6">
      <li v-if="isLoading" class="animate-pulse">
        <div class="flex min-h-20 items-center space-x-4">
          <div class="min-w-0 flex-1">
            <p class="h-4 rounded-full bg-gray-200"></p>
            <p class="mt-2 h-4 rounded-full bg-gray-200"></p>
          </div>
        </div>
      </li>

      <li v-else v-for="user in users" :key="user.id" class="py-4">
        <div class="flex items-center space-x-4">
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-gray-900">
              {{ user.name }}
            </p>
            <p class="mt-2 truncate text-sm text-gray-500">
              {{ new Date(user.createdAt).toLocaleString() }}
            </p>
          </div>

          <div>
            <UserButtons
              :key="user.id"
              @keys="showPreAuthKeys(user.id)"
              @rename="renameUser(user.id)"
              @create-key="createPreAuthKey(user.id)"
              @delete="deleteUser(user.id)"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { UserPlusIcon } from "@heroicons/vue/24/outline";
import UserButtons from "../components/UserButtons.vue";
import { User } from "../helpers/types";
import { api, useStateApi } from "../plugins/api";

const { state, isLoading } = useStateApi(() => api().GET("/api/v1/user"));

const users = computed(() => {
  const users = <User[] | undefined>state.value?.users;

  if (!users) {
    return [];
  }

  return users;
});

const showPreAuthKeys = (id: string) =>
  console.log(`Pre auth keys for user ${id}`);
const renameUser = (id: string) => console.log(`Rename for user ${id}`);
const createPreAuthKey = (id: string) =>
  console.log(`Create key for user ${id}`);
const deleteUser = (id: string) => console.log(`Delete user ${id}`);
</script>
