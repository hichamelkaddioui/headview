<template>
  <div class="my-12">
    <router-link
      :to="{ name: 'Machines list' }"
      class="text-indigo-700 hover:underline dark:text-indigo-300"
    >
      ← Back to the list
    </router-link>
  </div>

  <template v-if="isLoading">
    <div
      class="overflow-hidden rounded-lg border border-gray-300 bg-white sm:rounded-2xl dark:border-gray-700 dark:bg-slate-900 dark:text-white"
    >
      <div class="flex items-center justify-between px-4 py-5 sm:px-6">
        <div>
          <p
            class="my-2 h-4 w-48 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
          ></p>
          <p
            class="h-4 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
          ></p>
        </div>
      </div>
      <div
        class="overflow-x-auto border-t border-gray-200 px-4 py-5 sm:p-0 dark:border-gray-700"
      >
        <dl class="sm:divide-y sm:divide-gray-200 sm:dark:divide-gray-700">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Id
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <p
                class="h-4 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
              ></p>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Name
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <p
                class="h-4 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
              ></p>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Short domain
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <p
                class="h-4 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
              ></p>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              IP addresses
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                class="divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700"
              >
                <li
                  class="flex items-center justify-between overflow-x-auto py-3 pl-3 pr-4 text-sm"
                >
                  <p
                    class="h-4 w-48 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
                  ></p>
                </li>
                <li
                  class="flex items-center justify-between overflow-x-auto py-3 pl-3 pr-4 text-sm"
                >
                  <p
                    class="h-4 w-48 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
                  ></p>
                </li>
              </ul>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              User
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <p
                class="h-4 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
              ></p>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Created at
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <p
                class="h-4 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
              ></p>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Register method
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <p
                class="h-4 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
              ></p>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Last seen
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <p
                class="h-4 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
              ></p>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Last successful update
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <p
                class="h-4 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
              ></p>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Expiration
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <p
                class="h-4 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
              ></p>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Machine key
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <p
                class="h-4 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
              ></p>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Node key
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <p
                class="h-4 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
              ></p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </template>

  <template v-if="machine">
    <div
      class="overflow-hidden rounded-lg border border-gray-300 bg-white sm:rounded-2xl dark:border-gray-700 dark:bg-slate-900 dark:text-white"
    >
      <div class="flex items-center justify-between px-4 py-5 sm:px-6">
        <div>
          <h3 class="flex text-lg font-medium leading-6">
            <span
              :class="[
                machine.online ? 'bg-green-100' : 'bg-red-100',
                'me-2 mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full  text-sm font-semibold text-gray-800 dark:bg-gray-700 dark:text-slate-300',
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
          <p
            class="ms-8 mt-1 max-w-2xl text-sm text-gray-500 dark:text-slate-300"
          >
            {{ machine.name }}
          </p>
        </div>
        <div>
          <Menu as="div" class="relative -ml-px block">
            <div>
              <MenuButton
                class="inline-flex w-full justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-900 dark:focus:ring-offset-0"
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
                class="absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-lg bg-white shadow-sm ring-1 ring-black ring-opacity-20 focus:outline-none dark:divide-gray-700 dark:border-gray-200 dark:bg-slate-800"
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active
                          ? 'bg-gray-100 dark:bg-slate-700'
                          : 'text-gray-700 dark:text-slate-200',
                        'group flex items-center px-4 py-2 text-sm',
                      ]"
                      @click="modalRenameOpen = true"
                    >
                      <PencilSquareIcon
                        class="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600 dark:text-slate-200 dark:group-hover:text-gray-300"
                        aria-hidden="true"
                      />
                      Rename machine
                    </a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active
                          ? 'bg-gray-100 dark:bg-slate-700'
                          : 'text-gray-700 dark:text-slate-200',
                        'group flex items-center px-4 py-2 text-sm',
                      ]"
                      @click="$emit('create-key')"
                    >
                      <UserIcon
                        class="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600 dark:text-slate-200 dark:group-hover:text-gray-300"
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
                        active
                          ? 'bg-gray-100 text-red-600 dark:bg-slate-700 dark:text-red-500'
                          : 'text-red-500',
                        'group flex items-center px-4 py-2 text-sm font-medium',
                      ]"
                      @click="modalDeleteOpen = true"
                    >
                      <TrashIcon
                        class="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600 dark:group-hover:text-red-500"
                        aria-hidden="true"
                      />
                      Delete machine
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <div
        class="overflow-x-auto border-t border-gray-200 px-4 py-5 sm:p-0 dark:border-gray-700"
      >
        <dl class="sm:divide-y sm:divide-gray-200 sm:dark:divide-gray-700">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Id
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              {{ machine.id }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Name
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              {{ machine.name }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Short domain
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <CodeBlock :text="machine.givenName" />
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              IP addresses
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                class="divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700"
              >
                <li
                  v-for="ip in machine.ipAddresses.sort(
                    (a, b) => a.length - b.length,
                  )"
                  class="flex items-center justify-between overflow-x-auto py-3 pl-3 pr-4 text-sm"
                >
                  <span
                    class="mr-2 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1 text-gray-800 dark:border-gray-800 dark:bg-slate-600 dark:text-slate-100"
                  >
                    <code>{{ ip }}</code>
                  </span>

                  <div class="ml-4 flex-shrink-0">
                    <UseClipboard v-slot="{ copy, copied }" :source="ip">
                      <button
                        type="button"
                        class="inline-flex items-center rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-900 dark:focus:ring-offset-0"
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
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              User
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              {{ machine.user.name }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Created at
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              {{ new Date(machine.createdAt).toLocaleString() }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Register method
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <span
                class="inline-flex items-center rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-indigo-50"
              >
                {{ registerMethod }}
              </span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Last seen
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              {{ new Date(machine.lastSeen).toLocaleString() }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Last successful update
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              {{ new Date(machine.lastSuccessfulUpdate).toLocaleString() }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Expiration
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              {{ new Date(machine.expiry).toLocaleString() }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Machine key
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <CodeBlock :text="machine.machineKey.substring(0, 5)" />
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt class="text-sm font-medium text-gray-500 dark:text-slate-300">
              Node key
            </dt>
            <dd class="mt-3 text-sm sm:col-span-2 sm:mt-0">
              <CodeBlock :text="machine.nodeKey.substring(0, 5)" />
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <MachineModalRename
      :open="modalRenameOpen"
      :machine="machine"
      @update="onModalRenameUpdate"
      @close="modalRenameOpen = false"
    />

    <MachineModalDelete
      :open="modalDeleteOpen"
      :machine="machine"
      @delete="$router.push({ name: 'Machines list' })"
      @close="modalDeleteOpen = false"
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
import MachineModalDelete from "../components/MachineModalDelete.vue";
import MachineModalRename from "../components/MachineModalRename.vue";
import { Machine } from "../helpers/types";
import { api, useStateApi } from "../plugins/api";

// API state
const { id } = useRoute().params;
const params = { path: { machineId: String(id) } };
const apiCall = () => api().GET("/api/v1/machine/{machineId}", { params });
const { state, execute, isLoading } = useStateApi(apiCall, {
  resetOnExecute: false,
});

// Modals
const modalDeleteOpen = ref(false);
const modalRenameOpen = ref(false);
const onModalRenameUpdate = () => {
  execute();
  modalRenameOpen.value = false;
};

apiCall;

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
