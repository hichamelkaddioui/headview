<template>
  <ModalView
    :open="open"
    @close="$emit('close')"
    @before-enter="() => (newMachineName = machine.givenName)"
  >
    <div class="my-2">
      <h3
        class="mb-6 flex items-center text-lg font-medium leading-6 text-gray-900"
      >
        <div
          class="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 sm:h-10 sm:w-10"
        >
          <ServerIcon class="h-5 w-5" aria-hidden="true" />
        </div>

        Delete machine
      </h3>

      <p class="text-sm text-gray-500">
        Are you sure you want to delete the machine
        <b>{{ machine.givenName }} </b>? This action cannot be undone.
      </p>
    </div>

    <div
      class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
    >
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 sm:col-start-2 sm:text-sm"
        @click="onDelete"
        :disabled="isLoading"
      >
        <ArrowPathIcon
          v-if="isLoading"
          class="-ml-0.5 mr-2 h-5 w-5 animate-spin"
          aria-hidden="true"
        ></ArrowPathIcon>

        Delete
      </button>
      <button
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
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
import { ArrowPathIcon, ServerIcon } from "@heroicons/vue/24/outline";
import { Machine } from "../helpers/types";
import { api, useStateApi } from "../plugins/api";
import ModalView from "./ModalView.vue";

const props = defineProps<{ open: boolean; machine: Machine }>();
const emit = defineEmits(["close", "delete"]);

const newMachineName = ref("");

const apiCallOptions = computed(() => {
  const machineId = props.machine.id;

  return { params: { path: { machineId } } };
});
const apiCall = () =>
  api().DELETE("/api/v1/machine/{machineId}", apiCallOptions.value);
const stateOptions = { immediate: false, onSuccess: () => emit("delete") };
const { execute, isLoading } = useStateApi(apiCall, stateOptions);

const onDelete = () => execute();
</script>
