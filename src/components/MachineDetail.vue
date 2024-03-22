<template>
  <div class="my-12">
    <router-link
      :to="{ name: 'Machines list' }"
      class="text-indigo-700 hover:underline"
    >
      ← Back to the list
    </router-link>
  </div>

  <div
    class="overflow-hidden rounded-lg border border-gray-300 bg-white sm:rounded-2xl"
  >
    <div class="px-4 py-5 sm:px-6">
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
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ClipboardIcon, CheckIcon } from "@heroicons/vue/24/outline";
import { UseClipboard } from "@vueuse/components";
import { machineFactory } from "../helpers/data";
import CodeBlock from "./CodeBlock.vue";

const {
  params: { name },
} = useRoute();
const givenName = name.toString();
const machine = { ...machineFactory(3), givenName };
const registerMethod = machine.registerMethod.replace("REGISTER_METHOD_", "");
</script>
