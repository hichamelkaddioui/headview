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

    <div
      class="overflow-hidden rounded-xl border border-gray-300 ring-1 ring-black ring-opacity-5 sm:rounded-2xl dark:border-gray-600"
    >
      <div class="relative overflow-x-auto">
        <table
          class="w-full whitespace-nowrap text-left text-sm text-gray-500 rtl:text-right dark:text-white"
        >
          <thead
            class="border-b border-gray-300 bg-gray-50 text-xs uppercase text-gray-700 dark:border-gray-600 dark:bg-slate-700 dark:text-slate-300"
          >
            <tr>
              <th scope="col" class="px-5 py-6">Key</th>
              <th scope="col" class="px-5 py-6">Expired</th>
              <th scope="col" class="px-5 py-6">Used</th>
              <th scope="col" class="px-5 py-6">Reusable</th>
              <th scope="col" class="px-5 py-6">Ephemeral</th>
              <th scope="col" class="p-3">Creation date</th>
              <th scope="col" class="p-3">Expiration date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading" class="animate-pulse">
              <th scope="row" class="p-6 font-normal">
                <p class="h-4 rounded-full bg-gray-200 dark:bg-gray-700"></p>
              </th>
              <td class="px-3">
                <p class="h-4 rounded-full bg-gray-200 dark:bg-gray-700"></p>
              </td>
              <td class="px-3">
                <p class="h-4 rounded-full bg-gray-200 dark:bg-gray-700"></p>
              </td>
              <td class="px-3">
                <p class="h-4 rounded-full bg-gray-200 dark:bg-gray-700"></p>
              </td>
              <td class="px-3">
                <p class="h-4 rounded-full bg-gray-200 dark:bg-gray-700"></p>
              </td>
              <td class="px-3">
                <p class="h-4 rounded-full bg-gray-200 dark:bg-gray-700"></p>
              </td>
              <td class="px-3">
                <p class="h-4 rounded-full bg-gray-200 dark:bg-gray-700"></p>
              </td>
            </tr>
            <tr v-else-if="enrichedKeys.length === 0">
              <td colspan="7" class="p-6 text-center">No keys to show</td>
            </tr>
            <tr
              v-for="key in enrichedKeys"
              :key="key.id"
              class="border-b bg-white last:border-none hover:bg-slate-50 dark:border-gray-700 dark:bg-slate-800 dark:hover:bg-slate-700/80"
            >
              <th scope="row" class="px-3 py-6 font-normal dark:text-white">
                <UseClipboard v-slot="{ copy, copied }" :source="key.key">
                  <span
                    @click="copy()"
                    class="me-2 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1 text-gray-800 dark:border-gray-500 dark:bg-slate-600 dark:text-slate-100"
                  >
                    <code>{{ copied ? "Copied!" : key.key }}</code>
                  </span>
                </UseClipboard>
              </th>
              <td class="px-3">
                <span
                  v-if="key.expired"
                  class="me-2 rounded-lg border border-yellow-400 bg-yellow-100 px-2.5 py-1 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                >
                  Expired
                </span>
                <span
                  v-else-if="key.used && !key.reusable"
                  class="me-2 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1 text-gray-800 dark:border-gray-500 dark:bg-slate-600 dark:text-slate-100"
                >
                  Not expired
                </span>
                <button
                  v-else
                  type="button"
                  class="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-900 dark:focus:ring-indigo-500 dark:focus:ring-offset-0"
                  @click="expirePreAuthKey(key.user, key.key)"
                >
                  Expire
                </button>
              </td>
              <td class="px-3">
                <span
                  v-if="!key.used"
                  class="me-2 rounded-lg border border-green-400 bg-green-100 px-2.5 py-1 text-green-800 dark:border-green-700 dark:bg-green-900 dark:text-green-300"
                >
                  Not used
                </span>
                <span
                  class="me-2 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1 text-gray-800 dark:border-gray-500 dark:bg-slate-600 dark:text-slate-100"
                  v-else-if="!key.ephemeral"
                >
                  Used
                </span>
                <span
                  v-else
                  class="me-2 rounded-lg border border-yellow-400 bg-yellow-100 px-2.5 py-1 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                >
                  Used
                </span>
              </td>
              <td class="px-3">
                <span
                  v-if="!key.ephemeral && key.reusable"
                  class="me-2 rounded-lg border border-indigo-400 bg-indigo-100 px-2.5 py-1 text-indigo-800 dark:border-indigo-500 dark:bg-indigo-800 dark:text-indigo-200"
                >
                  Reusable
                </span>
                <span
                  v-else
                  class="me-2 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1 text-gray-800 dark:border-gray-500 dark:bg-slate-600 dark:text-slate-100"
                >
                  Not reusable
                </span>
              </td>
              <td class="px-3">
                <span
                  v-if="key.ephemeral"
                  class="me-2 rounded-lg border border-yellow-400 bg-yellow-100 px-2.5 py-1 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                >
                  Ephemeral
                </span>
                <span
                  v-else
                  class="me-2 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1 text-gray-800 dark:border-gray-500 dark:bg-slate-600 dark:text-slate-100"
                >
                  Not ephemeral
                </span>
              </td>
              <td class="px-3">
                {{ new Date(key.createdAt).toLocaleString() }}
              </td>
              <td class="px-3">
                {{ new Date(key.expiration).toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

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
import ModalView from "./ModalView.vue";
import SwitchButton from "./SwitchButton.vue";

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

const enrichedKeys = computed(() =>
  state.value?.preAuthKeys
    ? enrichKeys(state.value?.preAuthKeys).filter(
        ({ used, reusable, expired }) => {
          // Show all keys
          if (!onlyShowUsable.value) return true;

          // Hide expired keys and keys that cannot be used again
          if (expired) return false;
          if (used && !reusable) return false;

          return true;
        },
      )
    : [],
);
</script>
