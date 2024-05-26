<template>
  <ModalView
    :open="open"
    @close="$emit('close')"
    @before-enter="() => (newMachineName = machine.givenName)"
  >
    <div class="my-2">
      <h3 class="mb-6 flex items-center text-lg font-medium leading-6">
        <div
          class="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 sm:h-10 sm:w-10 dark:bg-indigo-800 dark:text-indigo-300"
        >
          <ServerIcon class="h-5 w-5" aria-hidden="true" />
        </div>

        Rename machine
      </h3>

      <form action="#" @submit.prevent="onRenameSubmit">
        <label for="name" class="block text-sm font-medium"> New name </label>
        <div class="mt-3">
          <input
            type="text"
            name="name"
            id="name"
            class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-slate-600 dark:bg-slate-700 dark:placeholder:text-gray-400 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
            v-model="newMachineName"
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
        @click="onRenameSubmit"
        :disabled="isEmpty || isLoading"
      >
        <ArrowPathIcon
          v-if="isLoading"
          class="-ml-0.5 mr-2 h-5 w-5 animate-spin"
          aria-hidden="true"
        ></ArrowPathIcon>

        Rename
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
const isEmpty = computed(() => newMachineName.value.length === 0);
</script>
