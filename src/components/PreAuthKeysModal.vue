<template>
  <ModalView size="xl" :open="open" @before-enter="fetchKeys">
    <div class="my-2">
      <h3 class="mb-6 flex items-center text-lg font-medium leading-6">
        <div
          class="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 sm:h-10 sm:w-10 dark:bg-indigo-800 dark:text-indigo-300"
        >
          <KeyIcon class="h-5 w-5" aria-hidden="true" />
        </div>

        Pre-authentication keys
      </h3>
    </div>

    <h3 class="mb-6 mt-12 text-lg font-medium leading-6">
      Create pre-authentication key
    </h3>

    <CardView>
      <form @submit.prevent="() => createKey()">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div class="relative items-start">
            <label for="name" class="block text-sm font-medium">
              Expiration date
            </label>
            <div class="mt-3">
              <input
                type="date"
                name="name"
                id="name"
                class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-slate-600 dark:bg-slate-700 dark:placeholder:text-gray-400 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                v-model="createPreAuthKeyModel.expiration"
              />
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-300">
                Date at which the key expires
              </p>
            </div>
          </div>

          <div class="relative flex items-start pt-2 sm:pt-8">
            <div class="flex h-5 items-center">
              <input
                id="reusable"
                name="reusable"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                v-model="createPreAuthKeyModel.reusable"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="reusable" class="font-medium"> Reusable </label>
              <p class="text-slate-500 dark:text-slate-300">
                Use this key to authenticate more than one device
              </p>
            </div>
          </div>
          <div class="relative flex items-start pt-2 sm:pt-8">
            <div class="flex h-5 items-center">
              <input
                id="ephemeral"
                name="ephemeral"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                v-model="createPreAuthKeyModel.ephemeral"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="ephemeral" class="font-medium"> Ephemeral </label>
              <p class="text-slate-500 dark:text-slate-300">
                Devices authenticated by this key will be automatically removed
                after going offline
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="mt-4 inline-flex justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="() => createKey()"
        >
          Create key
        </button>
      </form>
    </CardView>

    <h3 class="mb-6 mt-12 text-lg font-medium leading-6">
      Pre-authentication keys list
    </h3>

    <div class="my-4">
      <SwitchButton v-model="onlyShowUsable">
        <span class="text-sm font-medium"> Only show usable keys </span>
      </SwitchButton>
    </div>

    <TableView
      :data="enrichedKeys"
      :cols="[
        'key',
        'expired',
        'used',
        'reusable',
        'ephemeral',
        'createdAt',
        'expiration',
      ]"
      :is-loading="isLoading"
      :classes="{ td: 'py-6 px-4' }"
    >
      <template #keyCell="{ key }">
        <UseClipboard v-slot="{ copy, copied }" :source="key">
          <span title="Click to copy">
            <CodeBlock :text="copied ? 'Copied!' : key" @click="copy()" />
          </span>
        </UseClipboard>
      </template>

      <template #expiredCell="{ key, expired, used, reusable, user }">
        <ChipView v-if="expired" variant="yellow"> Expired </ChipView>
        <ChipView v-else-if="used && !reusable"> Not expired </ChipView>

        <button
          v-else
          type="button"
          class="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-900 dark:focus:ring-indigo-500 dark:focus:ring-offset-0"
          @click="expirePreAuthKey(user, key)"
        >
          Expire
        </button>
      </template>

      <template #usedCell="{ used, reusable }">
        <ChipView v-if="!used" variant="green"> Not used </ChipView>
        <ChipView v-else-if="used && reusable"> Used </ChipView>
        <ChipView v-else variant="yellow">Used</ChipView>
      </template>

      <template #reusableCell="{ reusable }">
        <ChipView v-if="reusable" variant="indigo"> Reusable </ChipView>
        <ChipView v-else>Not reusable</ChipView>
      </template>

      <template #ephemeralCell="{ ephemeral }">
        <ChipView v-if="ephemeral" variant="indigo"> Ephemeral </ChipView>
        <ChipView v-else>Not ephemeral</ChipView>
      </template>

      <template #createdAtColumn>Creation date</template>
      <template #createdAtCell="{ createdAt }">
        <span class="ps-2">
          {{ new Date(createdAt).toLocaleString() }}
        </span>
      </template>

      <template #expirationColumn>Expiration date</template>
      <template #expirationCell="{ expiration }">
        <span class="ps-2">
          {{ new Date(expiration).toLocaleString() }}
        </span>
      </template>
    </TableView>

    <div class="mx-auto mt-5 max-w-sm sm:mt-12">
      <button
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
        @click="$emit('close')"
      >
        Close
      </button>
    </div>
  </ModalView>
</template>

<script setup lang="ts">
// TODO: ACL tags
import { computed, ref } from "vue";
import { KeyIcon } from "@heroicons/vue/24/outline";
import { UseClipboard } from "@vueuse/components";
import { enrichKeys } from "../helpers/keys";
import { api, useStateApi } from "../plugins/api";
import CardView from "./CardView.vue";
import ChipView from "./ChipView.vue";
import CodeBlock from "./CodeBlock.vue";
import ModalView from "./ModalView.vue";
import SwitchButton from "./SwitchButton.vue";
import TableView from "./TableView.vue";

const props = defineProps<{ open: boolean; user: string }>();
const createPreAuthKeyModel = ref({
  reusable: true,
  ephemeral: false,
  expiration: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
});
const onlyShowUsable = ref(false);

const fetchApiCall = () =>
  api().GET("/api/v1/preauthkey", {
    params: { query: { user: props.user } },
  });
const {
  state,
  execute: fetchKeys,
  isLoading,
} = useStateApi(fetchApiCall, { immediate: false });

const createPreAuthKeyBody = computed(() => {
  const { reusable, ephemeral, expiration } = createPreAuthKeyModel.value;
  const { user } = props;

  return {
    user,
    reusable,
    ephemeral,
    expiration: expiration ? new Date(expiration).toISOString() : undefined,
  };
});
const createPreAuthKeyCall = () =>
  api().POST("/api/v1/preauthkey", { body: createPreAuthKeyBody.value });
const { execute: createKey } = useStateApi(createPreAuthKeyCall, {
  immediate: false,
  onSuccess: fetchKeys,
});

const expirePreAuthKey = async (user: string, key: string) => {
  await api().POST("/api/v1/preauthkey/expire", {
    body: { key, user },
  });

  await fetchKeys();
};

const enrichedKeys = computed(() => {
  if (!state.value?.preAuthKeys) {
    return [];
  }

  return enrichKeys(state.value.preAuthKeys).filter(
    ({ used, reusable, expired }) => {
      // Show all keys
      if (!onlyShowUsable.value) return true;

      // Hide expired keys and keys that cannot be used again
      if (expired) return false;
      if (used && !reusable) return false;

      return true;
    },
  );
});
</script>
