<template>
  <span
    class="mr-2 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1 text-gray-800"
  >
    <code>{{ text }}</code>
  </span>
</template>

<script setup lang="ts">
defineProps<{ text: string }>();
</script>
