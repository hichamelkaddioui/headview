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
          class="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 sm:h-10 sm:w-10"
        >
          <ServerIcon class="h-5 w-5" aria-hidden="true" />
        </div>

        Rename machine
      </h3>

      <form action="#" @submit.prevent="onRenameSubmit">
        <label for="name" class="block text-sm font-medium text-gray-900">
          New name
        </label>
        <div class="mt-3">
          <input
            type="text"
            name="name"
            id="name"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            v-model="newMachineName"
          />
        </div>
      </form>
    </div>

    <div
      class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
    >
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 sm:col-start-2 sm:text-sm"
        @click="onRenameSubmit"
        :disabled="isLoading"
      >
        <ArrowPathIcon
          v-if="isLoading"
          class="-ml-0.5 mr-2 h-5 w-5 animate-spin"
          aria-hidden="true"
        ></ArrowPathIcon>

        Rename
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
const emit = defineEmits(["close", "update"]);

const newMachineName = ref("");

const apiCallOptions = computed(() => {
  const machineId = props.machine.id;
  const newName = newMachineName.value;
  const params = { path: { machineId, newName } };

  return { params };
});

const apiCall = () =>
  api().POST(
    "/api/v1/machine/{machineId}/rename/{newName}",
    apiCallOptions.value,
  );

const stateOptions = { immediate: false, onSuccess: () => emit("update") };
const { execute, isLoading } = useStateApi(apiCall, stateOptions);

const onRenameSubmit = () => execute();
</script>
