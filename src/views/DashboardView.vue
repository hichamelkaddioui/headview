<template>
  <div class="my-12 grid grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-4">
    <StatCard>
      <template #header>
        <ServerStackIcon class="me-2 h-6 w-6 flex-shrink-0" />
        Total machines
      </template>

      <b class="mr-4 text-3xl md:text-5xl dark:text-gray-100">
        {{ machines?.length || "-" }}
      </b>
    </StatCard>

    <StatCard>
      <template #header>
        <ServerStackIcon class="me-2 h-6 w-6 flex-shrink-0" />

        Online machines
      </template>

      <b class="mr-4 text-3xl md:text-5xl dark:text-gray-100">
        {{ onlineMachines?.length || "-" }}
      </b>
    </StatCard>

    <StatCard>
      <template #header>
        <UsersIcon class="me-2 h-6 w-6 flex-shrink-0" />

        Total users
      </template>

      <b class="mr-4 text-3xl md:text-5xl dark:text-gray-100">
        {{ totalUsers }}
      </b>
    </StatCard>

    <StatCard>
      <template #header>
        <KeyIcon class="me-2 h-6 w-6 flex-shrink-0" />

        Total auth keys
      </template>

      <b class="mr-4 text-3xl md:text-5xl dark:text-gray-100">
        {{ keys?.length || "-" }}
      </b>
    </StatCard>

    <StatCard>
      <template #header>
        <KeyIcon class="me-2 h-6 w-6 flex-shrink-0" />

        Usable auth keys
      </template>

      <b class="mr-4 text-3xl md:text-5xl dark:text-gray-100">
        {{ usableKeys?.length || "-" }}
      </b>
    </StatCard>

    <StatCard>
      <template #header>
        <WrenchScrewdriverIcon class="me-2 h-6 w-6 flex-shrink-0" />

        API keys
      </template>

      <b class="mr-4 text-3xl md:text-5xl dark:text-gray-100">
        {{ apiKeysState?.apiKeys?.length || "-" }}
      </b>
    </StatCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  KeyIcon,
  ServerStackIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/vue/24/outline";
import { useAsyncState } from "@vueuse/core";
import StatCard from "../components/StatCard.vue";
import { enrichKeys } from "../helpers/keys";
import { PreAuthKey } from "../helpers/types";
import { api, useStateApi } from "../plugins/api";

const { state: machinesState } = useStateApi(() =>
  api().GET("/api/v1/machine"),
);

const emptyUsersAndKeys = { users: [], keys: [] };
const getUsersAndKeys = async () => {
  const usersQuery = await api().GET("/api/v1/user");

  if (!(usersQuery.data && usersQuery.data.users)) {
    return emptyUsersAndKeys;
  }
  const {
    data: { users },
  } = usersQuery;

  const keysPromises = users.map(({ name }) =>
    api().GET("/api/v1/preauthkey", { params: { query: { user: name } } }),
  );
  const keysQuery = await Promise.all(keysPromises);
  const keys = keysQuery
    .flatMap((res) => res.data?.preAuthKeys)
    .filter((key): key is PreAuthKey => !!key);

  return { users, keys };
};
const { state: usersAndKeysState } = useAsyncState(
  getUsersAndKeys,
  emptyUsersAndKeys,
);
const { state: apiKeysState } = useStateApi(() => api().GET("/api/v1/apikey"));

const machines = computed(() => machinesState.value?.machines);
const onlineMachines = computed(() =>
  machines.value?.filter(({ online }) => online),
);
const totalUsers = computed(() => usersAndKeysState.value.users.length || "-");
const keys = computed(() => usersAndKeysState.value.keys);
const usableKeys = computed(() =>
  enrichKeys(keys.value).filter(
    ({ used, reusable, expired }) => !expired && !(used && !reusable),
  ),
);
</script>
