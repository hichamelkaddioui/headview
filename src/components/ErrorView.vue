<template>
  <div v-if="error" class="rounded-lg bg-red-50 p-4 dark:bg-red-900">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon
          class="h-5 w-5 text-red-400 dark:text-red-300"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
          That didn't work
        </h3>
        <div class="mt-2 text-sm text-red-700 dark:text-red-300">
          <pre class="whitespace-normal">{{ errorMessage }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { XCircleIcon } from "@heroicons/vue/24/outline";
import { getMessage } from "../helpers/error";

const props = defineProps<{ error: unknown }>();

const errorMessage = computed(() => getMessage(props.error));
</script>
