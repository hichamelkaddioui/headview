<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="/headview.svg" alt="Headview" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight">
        Headview
      </h2>
    </div>

    <div class="mt-16 px-4 sm:mx-auto sm:w-full sm:max-w-xl">
      <ErrorView v-if="loginError" :error="loginError" class="mb-10" />

      <div
        class="rounded-lg border bg-white px-4 py-8 sm:rounded-2xl sm:px-10 dark:border-gray-700 dark:bg-slate-900"
      >
        <form class="space-y-6" action="#" @submit.prevent="login">
          <div>
            <label for="serverUrl" class="block text-sm font-medium">
              Server URL
            </label>
            <div class="mt-3">
              <input
                type="text"
                name="serverUrl"
                autocomplete="url"
                placeholder="https://headscale.domain"
                class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-slate-600 dark:bg-slate-700 dark:placeholder:text-gray-400 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                v-model="baseUrl"
              />
            </div>
          </div>

          <div>
            <label for="apiKey" class="block text-sm font-medium">
              API key
            </label>
            <div class="mt-3">
              <input
                type="text"
                name="apiKey"
                class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-slate-600 dark:bg-slate-700 dark:placeholder:text-gray-400 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                v-model="apiKey"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="inline-flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 sm:col-start-2 sm:text-sm dark:disabled:bg-gray-800"
              @click="login"
              :disabled="isLoading"
            >
              <ArrowPathIcon
                v-if="isLoading"
                class="-ml-0.5 mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              ></ArrowPathIcon>

              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import createClient from "openapi-fetch";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import { useAsyncState } from "@vueuse/core";
import ErrorView from "../components/ErrorView.vue";
import { paths } from "../plugins/api/types";
import router from "../plugins/router";
import { useAuthStore } from "../store/auth";

const { baseUrl } = storeToRefs(useAuthStore());
const apiKey = ref("");
const loginError = ref<string | null>(null);

const verifyAuth = async (baseUrl: string, apiKey: string) => {
  const headers = { Authorization: `Bearer ${apiKey}` };
  const client = createClient<paths>({ baseUrl, headers });

  loginError.value = null;

  try {
    const { error } = await client.GET("/api/v1/user");

    if (error) {
      loginError.value = error.message ?? "Unknown error";

      throw error;
    }

    return true;
  } catch (err) {
    loginError.value = `${err}` ?? null;
    return false;
  }
};

const { execute, isLoading } = useAsyncState(verifyAuth, undefined, {
  immediate: false,
});

const login = async () => {
  const credentialsAreCorrect = await execute(0, baseUrl.value, apiKey.value);

  if (!credentialsAreCorrect) {
    return;
  }

  const authStore = useAuthStore();

  authStore.baseUrl = baseUrl.value;
  authStore.apiKey = apiKey.value;

  router.push({ name: "Dashboard" });
};
</script>
