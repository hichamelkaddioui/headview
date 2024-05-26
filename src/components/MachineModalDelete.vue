<template>
  <ModalView
    :open="open"
    @close="$emit('close')"
    @before-enter="() => (newMachineName = machine.givenName)"
  >
    <div class="my-2">
      <h3 class="mb-6 flex items-center text-lg font-medium leading-6">
        <div
          class="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 sm:h-10 sm:w-10 dark:bg-red-900 dark:text-red-400"
        >
          <ServerIcon class="h-5 w-5" aria-hidden="true" />
        </div>

        Delete machine
      </h3>

      <p class="text-sm text-gray-500 dark:text-slate-300">
        Are you sure you want to delete the machine
        <b>{{ machine.givenName }} </b>? This action cannot be undone.
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
import { computed, ref } from "vue";
import { ArrowPathIcon, ServerIcon } from "@heroicons/vue/24/outline";
import { Machine } from "../helpers/types";
import { api, useStateApi } from "../plugins/api";
import ButtonView from "./ButtonView.vue";
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
