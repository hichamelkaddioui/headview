<template>
  <ModalView size="xl" :open="open" @before-enter="fetchKeys">
    <div class="my-2">
      <h3
        class="mb-6 flex items-center text-lg font-medium leading-6 text-gray-900"
      >
        <div
          class="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 sm:h-10 sm:w-10"
        >
          <KeyIcon class="h-5 w-5" aria-hidden="true" />
        </div>

        Pre-authentication keys
      </h3>
    </div>

    <h3 class="mb-6 mt-12 text-lg font-medium leading-6 text-gray-900">
      Create pre-authentication key
    </h3>

    <div class="rounded-lg border border-gray-300 bg-white p-6 sm:rounded-2xl">
      <form @submit.prevent="() => createKey()">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div class="relative items-start">
            <label for="name" class="block text-sm font-medium text-gray-900">
              Expiration date
            </label>
            <div class="mt-3">
              <input
                type="date"
                name="name"
                id="name"
                class="block w-full rounded-lg border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                v-model="createPreAuthKeyModel.expiration"
              />
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
              <label for="reusable" class="font-medium text-gray-900">
                Reusable
              </label>
              <p class="text-gray-500">
                The key can be used to authenticate multiple machines
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
              <label for="ephemeral" class="font-medium text-gray-900">
                Ephemeral
              </label>
              <p class="text-gray-500">The key can be only be used once</p>
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
    </div>

    <h3 class="mb-6 mt-12 text-lg font-medium leading-6 text-gray-900">
      Pre-authentication keys list
    </h3>

    <div
      class="overflow-hidden rounded-xl border border-gray-300 bg-white ring-1 ring-black ring-opacity-5 sm:rounded-2xl"
    >
      <div class="relative overflow-x-auto">
        <table
          class="w-full whitespace-nowrap text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
        >
          <thead
            class="border-b border-gray-300 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
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
            <tr v-if="isLoading" class="">
              <th
                scope="row"
                class="p-6 font-normal text-gray-900 dark:text-white"
              >
                <p class="h-4 rounded-full bg-gray-200"></p>
              </th>
              <td class="px-3"><p class="h-4 rounded-full bg-gray-200"></p></td>
              <td class="px-3"><p class="h-4 rounded-full bg-gray-200"></p></td>
              <td class="px-3"><p class="h-4 rounded-full bg-gray-200"></p></td>
              <td class="px-3"><p class="h-4 rounded-full bg-gray-200"></p></td>
              <td class="px-3"><p class="h-4 rounded-full bg-gray-200"></p></td>
              <td class="px-3"><p class="h-4 rounded-full bg-gray-200"></p></td>
            </tr>
            <tr
              v-for="key in enrichedKeys"
              :key="key.id"
              class="border-b bg-white last:border-none hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-800"
            >
              <th
                scope="row"
                class="px-3 py-6 font-normal text-gray-900 dark:text-white"
              >
                <UseClipboard v-slot="{ copy, copied }" :source="key.key">
                  <span
                    @click="copy()"
                    class="me-2 rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1 text-gray-800 hover:cursor-pointer"
                  >
                    <code>{{ copied ? "Copied!" : key.key }}</code>
                  </span>
                </UseClipboard>
              </th>
              <td class="px-3">
                <span
                  v-if="key.expired"
                  class="me-2 rounded-lg border border-yellow-400 bg-yellow-100 px-2.5 py-1 text-yellow-800"
                >
                  Expired
                </span>
                <button
                  v-else
                  type="button"
                  class="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="expirePreAuthKey(key.user, key.key)"
                >
                  Expire
                </button>
              </td>
              <td class="px-3">
                <span
                  v-if="!key.used"
                  class="me-2 rounded-lg border border-green-400 bg-green-100 px-2.5 py-1 text-green-800"
                >
                  Not used
                </span>
                <span
                  v-else
                  class="me-2 rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1 text-gray-800"
                >
                  Used
                </span>
              </td>
              <td class="px-3">
                <span
                  v-if="!key.ephemeral && key.reusable"
                  class="me-2 rounded-lg border border-indigo-400 bg-indigo-100 px-2.5 py-1 text-indigo-800"
                >
                  Reusable
                </span>
                <span
                  v-else
                  class="me-2 rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1 text-gray-800"
                >
                  Not reusable
                </span>
              </td>
              <td class="px-3">
                <span
                  v-if="key.ephemeral"
                  class="me-2 rounded-lg border border-yellow-400 bg-yellow-100 px-2.5 py-1 text-yellow-800"
                >
                  Ephemeral
                </span>
                <span
                  v-else
                  class="me-2 rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1 text-gray-800"
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
        class="mt-3 inline-flex w-full justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
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
import { PreAuthKey } from "../helpers/types";
import { api, useStateApi } from "../plugins/api";
import ModalView from "./ModalView.vue";

const props = defineProps<{ open: boolean; user: string }>();
const createPreAuthKeyModel = ref({
  reusable: true,
  ephemeral: false,
  expiration: null,
});

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
    ? state.value.preAuthKeys
        .filter((key): key is Required<PreAuthKey> => !!key)
        .map((key) => {
          const expiration = new Date(key.expiration);
          const expired = +expiration - +new Date() < 0;

          return { ...key, expired };
        })
    : [],
);
</script>
