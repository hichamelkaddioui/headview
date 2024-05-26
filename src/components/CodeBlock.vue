<template>
  <span
    class="me-2 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1 text-gray-800 hover:cursor-pointer dark:border-gray-800 dark:bg-slate-600 dark:text-slate-100"
  >
    <code>{{ text }}</code>
  </span>
</template>

<script setup lang="ts">
defineProps<{ text: string }>();
</script>
