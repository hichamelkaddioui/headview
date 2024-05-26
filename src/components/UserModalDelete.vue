<template>
  <ModalView :open="open" @close="$emit('close')">
    <div class="my-2">
      <h3 class="mb-6 flex items-center text-lg font-medium leading-6">
        <div
          class="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 sm:h-10 sm:w-10 dark:bg-red-900 dark:text-red-400"
        >
          <UserIcon class="h-5 w-5" aria-hidden="true" />
        </div>

        Delete user
      </h3>

      <p class="text-sm text-gray-500 dark:text-slate-300">
        Are you sure you want to delete the user
        <b>{{ user }} </b>? This action cannot be undone.
      </p>
    </div>

    <div
      class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
    >
      <ButtonView
        variant="red"
        class="w-full justify-center sm:col-start-2"
        @click="onDelete"
        :disabled="isLoading"
      >
        <ArrowPathIcon
          v-if="isLoading"
          class="-ml-0.5 mr-2 h-5 w-5 animate-spin"
          aria-hidden="true"
        ></ArrowPathIcon>

        Delete
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
import { computed } from "vue";
import { ArrowPathIcon, UserIcon } from "@heroicons/vue/24/outline";
import { api, useStateApi } from "../plugins/api";
import ButtonView from "./ButtonView.vue";
import ModalView from "./ModalView.vue";

const props = defineProps<{ open: boolean; user: string }>();
const emit = defineEmits(["close", "delete"]);

const apiCallOptions = computed(() => {
  const name = props.user;

  return { params: { path: { name } } };
});
const apiCall = () => api().DELETE("/api/v1/user/{name}", apiCallOptions.value);
const stateOptions = { immediate: false, onSuccess: () => emit("delete") };
const { execute, isLoading } = useStateApi(apiCall, stateOptions);

const onDelete = () => execute();
</script>
