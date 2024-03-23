<template>
  <div class="my-12">
    <router-link
      :to="{ name: 'Machines list' }"
      class="text-indigo-700 hover:underline"
    >
      ← Back to the list
    </router-link>
  </div>

  <template v-if="machine">
    <div
      class="overflow-hidden rounded-lg border border-gray-300 bg-white sm:rounded-2xl"
    >
      <div class="flex items-center justify-between px-4 py-5 sm:px-6">
        <div>
          <h3 class="flex text-lg font-medium leading-6 text-gray-900">
            <span
              :class="[
                machine.online ? 'bg-green-100' : 'bg-red-100',
                'me-2 mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full  text-sm font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-300',
              ]"
            >
              <div
                :class="[
                  machine.online ? 'bg-green-500' : 'bg-red-500',
                  'h-1.5 w-1.5 rounded-full',
                ]"
              ></div>
            </span>

            {{ machine.givenName }}
          </h3>
          <p class="ms-8 mt-1 max-w-2xl text-sm text-gray-500">
            {{ machine.name }}
          </p>
        </div>
        <div>
          <Menu as="div" class="relative -ml-px block">
            <div>
              <MenuButton
                class="inline-flex w-full justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                Options
                <ChevronDownIcon
                  class="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-20 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'group flex items-center px-4 py-2 text-sm',
                      ]"
                      @click="modalRenameOpen = true"
                    >
                      <PencilSquareIcon
                        class="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600"
                        aria-hidden="true"
                      />
                      Rename machine
                    </a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'group flex items-center px-4 py-2 text-sm',
                      ]"
                      @click="$emit('create-key')"
                    >
                      <UserIcon
                        class="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600"
                        aria-hidden="true"
                      />
                      Change owner
                    </a>
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100 text-red-600' : 'text-red-500',
                        'group flex items-center px-4 py-2 text-sm font-medium',
                      ]"
                      @click="$emit('delete')"
                    >
                      <TrashIcon
                        class="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600"
                        aria-hidden="true"
                      />
                      Delete user
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <div class="overflow-x-auto border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Id</dt>
            <dd class="mt-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{ machine.id }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Name</dt>
            <dd class="mt-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{ machine.name }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Short domain</dt>
            <dd class="mt-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <CodeBlock :text="machine.givenName" />
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">IP addresses</dt>
            <dd class="mt-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                class="divide-y divide-gray-200 rounded-md border border-gray-200"
              >
                <li
                  v-for="ip in machine.ipAddresses.sort(
                    (a, b) => a.length - b.length,
                  )"
                  class="flex items-center justify-between overflow-x-auto py-3 pl-3 pr-4 text-sm"
                >
                  <span
                    class="mr-2 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1 text-gray-800"
                  >
                    <code>{{ ip }}</code>
                  </span>

                  <div class="ml-4 flex-shrink-0">
                    <UseClipboard v-slot="{ copy, copied }" :source="ip">
                      <button
                        type="button"
                        class="inline-flex items-center rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        @click="copy()"
                        :disabled="copied"
                      >
                        <component
                          :is="copied ? CheckIcon : ClipboardIcon"
                          class="me-2 h-5 w-5"
                          aria-hidden="true"
                        />

                        {{ copied ? "Copied!" : "Copy" }}
                      </button>
                    </UseClipboard>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">User</dt>
            <dd class="mt-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{ machine.user.name }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Created at</dt>
            <dd class="mt-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{ new Date(machine.createdAt).toLocaleString() }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Register method</dt>
            <dd class="mt-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span
                class="inline-flex items-center rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800"
              >
                {{ registerMethod }}
              </span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Last seen</dt>
            <dd class="mt-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{ new Date(machine.lastSeen).toLocaleString() }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Last successful update
            </dt>
            <dd class="mt-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{ new Date(machine.lastSuccessfulUpdate).toLocaleString() }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Expiration</dt>
            <dd class="mt-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{ new Date(machine.expiry).toLocaleString() }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Machine key</dt>
            <dd class="mt-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <CodeBlock :text="machine.machineKey.substring(0, 5)" />
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Node key</dt>
            <dd class="mt-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <CodeBlock :text="machine.nodeKey.substring(0, 5)" />
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <MachineDetailModalRename
      :open="modalRenameOpen"
      :machine="machine"
      @update="onModalRenameUpdate"
      @close="modalRenameOpen = false"
    />
  </template>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  ChevronDownIcon,
  TrashIcon,
  UserIcon,
  ClipboardIcon,
  CheckIcon,
  PencilSquareIcon,
} from "@heroicons/vue/24/outline";
import { UseClipboard } from "@vueuse/components";
import CodeBlock from "../components/CodeBlock.vue";
import MachineDetailModalRename from "../components/MachineDetailModalRename.vue";
import { Machine } from "../helpers/types";
import { api, useStateApi } from "../plugins/api";

// API state
const { id } = useRoute().params;
const params = { path: { machineId: String(id) } };
const apiCall = () => api().GET("/api/v1/machine/{machineId}", { params });
const { state, execute } = useStateApi(apiCall, { resetOnExecute: false });

// Modals
const modalRenameOpen = ref(false);
const onModalRenameUpdate = () => {
  execute();
  modalRenameOpen.value = false;
};

const machine = computed(() => {
  const machine = <Machine | undefined>state.value?.machine;

  if (!machine) {
    return null;
  }

  return machine;
});

const registerMethod = computed(() => {
  if (!machine.value) {
    return "";
  }

  return machine.value.registerMethod.replace("REGISTER_METHOD_", "");
});
</script>
