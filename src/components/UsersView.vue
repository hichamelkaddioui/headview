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
        <li v-for="person in users" :key="person.id" class="py-4">
          <div class="flex items-center space-x-4">
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium text-gray-900">
                {{ person.name }}
              </p>
              <p class="mt-2 truncate text-sm text-gray-500">
                {{ new Date(person.createdAt).toLocaleString() }}
              </p>
            </div>

            <div>
              <UserButtons
                :key="person.id"
                @keys="showPreAuthKeys(person.id)"
                @rename="renameUser(person.id)"
                @create-key="createPreAuthKey(person.id)"
                @delete="deleteUser(person.id)"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { UserPlusIcon } from "@heroicons/vue/24/outline";
import { userFactory } from "../helpers/data";
import AppLayout from "./AppLayout.vue";
import UserButtons from "./UserButtons.vue";

const users = [...new Array(3)].map(userFactory);

const showPreAuthKeys = (id: string) =>
  console.log(`Pre auth keys for user ${id}`);
const renameUser = (id: string) => console.log(`Rename for user ${id}`);
const createPreAuthKey = (id: string) =>
  console.log(`Create key for user ${id}`);
const deleteUser = (id: string) => console.log(`Delete user ${id}`);
</script>
