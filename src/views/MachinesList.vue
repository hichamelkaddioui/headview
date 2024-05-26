<template>
  <button
    type="button"
    class="my-12 inline-flex items-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    <SquaresPlusIcon class="-ml-1 mr-2 h-6 w-6" aria-hidden="true" />
    Register new machine
  </button>

  <TableView
    :data="machines"
    :cols="['name', 'user', 'ipAddresses', 'details']"
    :is-loading="isLoading"
  >
    <template #nameCell="{ online, name }">
      <span class="whitespace-nowrap font-medium">
        <BadgeView class="me-2" :is-on="online" />
        {{ name }}
      </span>
    </template>

    <template #ipAddressesColumn>IP Addresses</template>
    <template #ipAddressesCell="{ ipAddresses }">
      <span v-for="ip in ipAddresses" :key="ip" title="Click to copy">
        <UseClipboard v-slot="{ copy, copied }" :source="ip">
          <CodeBlock :text="copied ? 'Copied!' : ip" @click="copy()" />
        </UseClipboard>
      </span>
    </template>

    <template #detailsColumn><span class="sr-only">Options</span></template>
    <template #detailsCell="{ id }">
      <button
        type="button"
        class="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-900 dark:focus:ring-indigo-500 dark:focus:ring-offset-0"
        @click="$router.push({ name: 'Machine details', params: { id } })"
      >
        Details
        <ArrowTopRightOnSquareIcon class="ms-2 h-5 w-5" aria-hidden="true" />
      </button>
    </template>
  </TableView>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { SquaresPlusIcon } from "@heroicons/vue/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";
import { UseClipboard } from "@vueuse/components";
import BadgeView from "../components/BadgeView.vue";
import CodeBlock from "../components/CodeBlock.vue";
import TableView from "../components/TableView.vue";
import { Machine } from "../helpers/types";
import { api, useStateApi } from "../plugins/api";

const { state, isLoading } = useStateApi(() => api().GET("/api/v1/machine"));

const machines = computed(() => {
  const machinesFromApi = <Machine[] | undefined>state.value?.machines;

  if (!machinesFromApi) {
    return [];
  }

  return machinesFromApi.map(
    ({ id, givenName, online, ipAddresses, user }) => ({
      id,
      online,
      name: givenName,
      ipAddresses: ipAddresses.sort((a, b) => a.length - b.length),
      user: user.name,
      details: null,
    }),
  );
});
</script>
