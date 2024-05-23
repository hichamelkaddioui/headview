<template>
  <button
    type="button"
    class="my-12 inline-flex items-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    <SquaresPlusIcon class="-ml-1 mr-2 h-6 w-6" aria-hidden="true" />
    Register new machine
  </button>

  <div
    class="overflow-hidden rounded-xl border border-gray-300 ring-1 ring-black ring-opacity-5 sm:rounded-2xl dark:border-gray-600"
  >
    <div class="relative overflow-x-auto">
      <table
        class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-white"
      >
        <thead
          class="border-b border-gray-300 bg-gray-50 text-xs uppercase text-gray-700 dark:border-gray-600 dark:bg-slate-700 dark:text-slate-300"
        >
          <tr>
            <th scope="col" class="p-6">Name</th>
            <th scope="col" class="p-6">IP Addresses</th>
            <th scope="col" class="p-6">Status</th>
            <th scope="col" class="p-6">User</th>
            <th scope="col" class="p-6">
              <span class="sr-only">Options</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <th scope="row" class="whitespace-nowrap px-6 py-4">
              <p class="h-4 rounded-full bg-gray-200 dark:bg-gray-700"></p>
            </th>
            <td class="p-6">
              <p class="h-4 rounded-full bg-gray-200 dark:bg-gray-700"></p>
            </td>
            <td class="p-6">
              <p class="h-4 rounded-full bg-gray-200 dark:bg-gray-700"></p>
            </td>
            <td class="p-6">
              <p class="h-4 rounded-full bg-gray-200 dark:bg-gray-700"></p>
            </td>
            <td class="p-6">
              <p class="h-4 rounded-full bg-gray-200 dark:bg-gray-700"></p>
            </td>
          </tr>
          <tr
            v-for="machine in machines"
            :key="machine.id"
            class="border-b bg-white last:border-none hover:bg-slate-50 dark:border-gray-700 dark:bg-slate-800 dark:hover:bg-slate-700/80"
          >
            <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium">
              {{ machine.givenName }}
            </th>
            <td class="p-6">
              <span
                v-for="ip in machine.ipAddresses.sort(
                  (a, b) => a.length - b.length,
                )"
                :key="ip"
                class="hover:cursor-pointer"
                title="Click to copy"
              >
                <UseClipboard v-slot="{ copy, copied }" :source="ip">
                  <CodeBlock :text="copied ? 'Copied!' : ip" @click="copy()" />
                </UseClipboard>
              </span>
            </td>
            <td class="p-6">
              <div class="flex items-center">
                <template v-if="machine.online">
                  <span
                    class="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-green-800"
                  >
                    <div
                      class="me-2 h-1.5 w-1.5 rounded-full bg-green-500"
                    ></div>
                    Online
                  </span>
                </template>
                <template v-else>
                  <span
                    class="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-red-800"
                  >
                    <div class="me-2 h-1.5 w-1.5 rounded-full bg-red-500"></div>
                    Offline
                  </span>
                </template>
              </div>
            </td>
            <td class="p-6">{{ machine.user?.name }}</td>
            <td class="p-6">
              <button
                type="button"
                class="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-900 dark:focus:ring-indigo-500 dark:focus:ring-offset-0"
                @click="
                  $router.push({
                    name: 'Machine details',
                    params: { id: machine.id },
                  })
                "
              >
                Details
                <ArrowTopRightOnSquareIcon
                  class="ms-2 h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { SquaresPlusIcon } from "@heroicons/vue/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";
import { UseClipboard } from "@vueuse/components";
import CodeBlock from "../components/CodeBlock.vue";
import { Machine } from "../helpers/types";
import { api, useStateApi } from "../plugins/api";

const { state, isLoading } = useStateApi(() => api().GET("/api/v1/machine"));

const machines = computed(() => {
  const nodes = <Machine[] | undefined>state.value?.machines;

  if (!nodes) {
    return [];
  }

  return nodes;
});
</script>
