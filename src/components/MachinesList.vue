<template>
  <button
    type="button"
    class="my-12 inline-flex items-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    <SquaresPlusIcon class="-ml-1 mr-2 h-6 w-6" aria-hidden="true" />
    Register new machine
  </button>

  <div
    class="overflow-hidden rounded-xl border border-gray-300 bg-white ring-1 ring-black ring-opacity-5 sm:rounded-2xl"
  >
    <div class="relative overflow-x-auto">
      <table
        class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
      >
        <thead
          class="border-b border-gray-300 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
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
          <tr
            v-for="machine in machines"
            :key="machine.id"
            class="border-b bg-white last:border-none hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-800"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
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
            <td class="p-6">{{ machine.user.name }}</td>
            <td class="p-6">
              <button
                type="button"
                class="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="
                  $router.push({
                    name: 'Machine details',
                    params: { name: machine.givenName },
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
import {
  ArrowTopRightOnSquareIcon,
  SquaresPlusIcon,
} from "@heroicons/vue/24/outline";
import { UseClipboard } from "@vueuse/components";
import { machineFactory } from "../helpers/data";
import CodeBlock from "./CodeBlock.vue";

const machines = [...new Array(10)]
  .map((_, idx) => idx + 1)
  .map(machineFactory);
</script>
