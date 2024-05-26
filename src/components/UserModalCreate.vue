<template>
  <ModalView :open="open" @close="$emit('close')" @before-enter="username = ''">
    <div class="my-2">
      <h3 class="mb-6 flex items-center text-lg font-medium leading-6">
        <div
          class="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 sm:h-10 sm:w-10 dark:bg-indigo-800 dark:text-indigo-300"
        >
          <UserPlusIcon class="h-5 w-5" aria-hidden="true" />
        </div>

        Create user
      </h3>

      <ErrorView v-if="error" :error="errorMessage" class="my-5" />

      <form action="#" @submit.prevent="onCreateSubmit">
        <label for="name" class="block text-sm font-medium"> User name </label>
        <div class="mt-3">
          <input
            type="text"
            name="name"
            id="name"
            class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-slate-600 dark:bg-slate-700 dark:placeholder:text-gray-400 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
            v-model="username"
          />
        </div>
      </form>
    </div>

    <div
      class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
    >
      <ButtonView
        variant="indigo"
        class="w-full justify-center sm:col-start-2"
        @click="onCreateSubmit"
        :disabled="isEmpty || isLoading"
      >
        <ArrowPathIcon
          v-if="isLoading"
          class="-ml-0.5 mr-2 h-5 w-5 animate-spin"
          aria-hidden="true"
        ></ArrowPathIcon>

        Create
      </ButtonView>

      <ButtonView
        @click="$emit('close')"
        class="mt-3 w-full justify-center sm:col-start-1 sm:mt-0"
      >
        Cancel
      </ButtonView>
    </div>
  </ModalView>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { ArrowPathIcon, UserPlusIcon } from "@heroicons/vue/24/outline";
import { api, useStateApi } from "../plugins/api";
import ButtonView from "./ButtonView.vue";
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
