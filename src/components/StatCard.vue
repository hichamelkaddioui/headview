<template>
  <CardView>
    <div
      class="w-content inline-flex items-center whitespace-nowrap border-b border-transparent text-xs font-bold uppercase tracking-wide text-gray-500 group-hover:text-indigo-700 dark:text-gray-400 dark:group-hover:text-indigo-500"
    >
      <slot name="header"></slot>
    </div>
    <div class="my-1 flex items-center whitespace-nowrap">
      <slot></slot>
    </div>
  </CardView>
</template>

<script setup lang="ts">
import CardView from "./CardView.vue";
</script>
