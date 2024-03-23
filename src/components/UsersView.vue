<template>
  <AppLayout>
    <button
      type="button"
      class="my-12 inline-flex items-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <UserPlusIcon class="-ml-1 mr-2 h-6 w-6" aria-hidden="true" />
      Create new user
    </button>

    <div class="rounded-lg border border-gray-300 bg-white sm:rounded-2xl">
      <ul role="list" class="-my-5 divide-y divide-gray-200 p-6">
        <li v-for="user in users" :key="user.id" class="py-4">
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
  </AppLayout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { UserPlusIcon } from "@heroicons/vue/24/outline";
import { useAsyncState } from "@vueuse/core";
import { api, initState } from "../plugins/api";
import { components } from "../plugins/api/types";
import AppLayout from "./AppLayout.vue";
import UserButtons from "./UserButtons.vue";

const { state } = useAsyncState(api().GET("/api/v1/user"), initState);

const users = computed(() => {
  const users = state.value.data?.users;

  if (!users) {
    return [];
  }

  return users as Array<Required<components["schemas"]["v1User"]>>;
});

const showPreAuthKeys = (id: string) =>
  console.log(`Pre auth keys for user ${id}`);
const renameUser = (id: string) => console.log(`Rename for user ${id}`);
const createPreAuthKey = (id: string) =>
  console.log(`Create key for user ${id}`);
const deleteUser = (id: string) => console.log(`Delete user ${id}`);
</script>
