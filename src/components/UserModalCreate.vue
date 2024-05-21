<template>
  <ModalView :open="open" @close="$emit('close')" @before-enter="username = ''">
    <div class="my-2">
      <h3
        class="mb-6 flex items-center text-lg font-medium leading-6 text-gray-900"
      >
        <div
          class="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 sm:h-10 sm:w-10"
        >
          <UserPlusIcon class="h-5 w-5" aria-hidden="true" />
        </div>

        Create user
      </h3>

      <ErrorView v-if="error" :error="errorMessage" class="my-5" />

      <form action="#" @submit.prevent="onCreateSubmit">
        <label for="name" class="block text-sm font-medium text-gray-900">
          User name
        </label>
        <div class="mt-3">
          <input
            type="text"
            name="name"
            id="name"
            class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            v-model="username"
          />
        </div>
      </form>
    </div>

    <div
      class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
    >
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 sm:col-start-2 sm:text-sm"
        @click="onCreateSubmit"
        :disabled="isEmpty || isLoading"
      >
        <ArrowPathIcon
          v-if="isLoading"
          class="-ml-0.5 mr-2 h-5 w-5 animate-spin"
          aria-hidden="true"
        ></ArrowPathIcon>

        Create
      </button>
      <button
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
        @click="$emit('close')"
        ref="cancelButtonRef"
      >
        Cancel
      </button>
    </div>
  </ModalView>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { ArrowPathIcon, UserPlusIcon } from "@heroicons/vue/24/outline";
import { api, useStateApi } from "../plugins/api";
import ErrorView from "./ErrorView.vue";
import ModalView from "./ModalView.vue";

defineProps<{ open: boolean }>();
const emit = defineEmits(["close", "create"]);

const username = ref("");

const apiCallOptions = computed(() => {
  const name = username.value;
  const body = { name };

  return { body };
});
const apiCall = () => api().POST("/api/v1/user", apiCallOptions.value);
const stateOptions = { immediate: false, onSuccess: () => emit("create") };
const { execute, isLoading, error } = useStateApi(apiCall, stateOptions);

const onCreateSubmit = () => !isEmpty.value && execute();

const isEmpty = computed(() => username.value.length === 0);
const errorMessage = computed(() => {
  return (error.value as { message: string })?.message;
});
</script>
