<template>
  <div class="rounded-lg bg-red-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">That didn't work</h3>
        <div class="mt-2 text-sm text-red-700">
          <pre class="whitespace-normal">{{ error }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XCircleIcon } from "@heroicons/vue/24/outline";

defineProps<{ error: string }>();
</script>
