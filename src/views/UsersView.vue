<template>
  <button
    type="button"
    class="my-12 inline-flex items-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    @click="modalCreateOpen = true"
  >
    <UserPlusIcon class="-ml-1 mr-2 h-6 w-6" aria-hidden="true" />
    Create new user
  </button>

  <div
    class="rounded-lg border border-gray-300 bg-white sm:rounded-2xl dark:border-gray-700 dark:bg-slate-800"
  >
    <ul
      role="list"
      class="-my-5 divide-y divide-gray-200 p-6 dark:divide-gray-600"
    >
      <li v-if="isLoading" class="animate-pulse">
        <div class="flex min-h-20 items-center space-x-4">
          <div class="min-w-0 flex-1">
            <p class="h-4 rounded-full bg-gray-200 dark:bg-gray-700"></p>
            <p class="mt-2 h-4 rounded-full bg-gray-200 dark:bg-gray-700"></p>
          </div>
        </div>
      </li>

      <li v-else v-for="user in users" :key="user.id" class="py-4">
        <div class="flex items-center space-x-4">
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">
              {{ user.name }}
            </p>
            <p class="mt-2 truncate text-sm text-gray-500 dark:text-slate-200">
              {{ new Date(user.createdAt).toLocaleString() }}
            </p>
          </div>

          <div>
            <UserButtons
              :key="user.id"
              @keys="onShowPreAuthKeys(user.name)"
              @rename="onShowRenameModal(user.name)"
              @delete="onShowDeleteModal(user.name)"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>

  <PreAuthKeysModalView
    :open="preAuthKeysModalOpen"
    :user="preAuthKeysModalUser"
    @close="preAuthKeysModalOpen = false"
  />

  <UserModalCreate
    :open="modalCreateOpen"
    @create="onModalCreated"
    @close="modalCreateOpen = false"
  />

  <UserModalRename
    :open="modalRenameOpen"
    :name="userToRename"
    @update="onModalRenamed"
    @close="modalRenameOpen = false"
  />

  <UserModalDelete
    :open="modalDeleteOpen"
    :user="userToDelete"
    @delete="onModalDeleted"
    @close="modalDeleteOpen = false"
  />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { UserPlusIcon } from "@heroicons/vue/24/outline";
import PreAuthKeysModalView from "../components/PreAuthKeysModal.vue";
import UserButtons from "../components/UserButtons.vue";
import UserModalCreate from "../components/UserModalCreate.vue";
import UserModalDelete from "../components/UserModalDelete.vue";
import UserModalRename from "../components/UserModalRename.vue";
import { User } from "../helpers/types";
import { api, useStateApi } from "../plugins/api";

const { state, isLoading, execute } = useStateApi(
  () => api().GET("/api/v1/user"),
  { resetOnExecute: false },
);
const preAuthKeysModalOpen = ref(false);
const preAuthKeysModalUser = ref("");
const modalCreateOpen = ref(false);
const modalRenameOpen = ref(false);
const userToRename = ref("");
const modalDeleteOpen = ref(false);
const userToDelete = ref("");

const users = computed(() => {
  const users = <User[] | undefined>state.value?.users;

  if (!users) {
    return [];
  }

  return users;
});

const onModalCreated = () => {
  execute();
  modalCreateOpen.value = false;
};

const onModalRenamed = () => {
  execute();
  modalRenameOpen.value = false;
};

const onModalDeleted = () => {
  execute();
  modalDeleteOpen.value = false;
};

const onShowPreAuthKeys = async (user: string) => {
  preAuthKeysModalUser.value = user;
  preAuthKeysModalOpen.value = true;
};

const onShowRenameModal = (name: string) => {
  userToRename.value = name;
  modalRenameOpen.value = true;
};

const onShowDeleteModal = (name: string) => {
  userToDelete.value = name;
  modalDeleteOpen.value = true;
};
</script>
