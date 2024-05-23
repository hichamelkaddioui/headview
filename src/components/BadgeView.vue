<template>
  <span
    :class="[
      isOn ? 'bg-green-100' : 'bg-red-100',
      'mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full  text-sm font-semibold text-gray-800 dark:bg-gray-700 dark:text-slate-300',
    ]"
  >
    <div
      :class="[
        isOn ? 'bg-green-500' : 'bg-red-500',
        'h-1.5 w-1.5 rounded-full',
      ]"
    ></div>
  </span>
</template>

<script setup lang="ts">
defineProps<{ isOn: boolean }>();
</script>
