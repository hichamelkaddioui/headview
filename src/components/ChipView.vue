<template>
  <span :class="[baseClass, colorVariants[variant]]">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
const baseClass = "me-2 rounded-lg border px-2.5 py-1";
const colorVariants = {
  gray: "border-gray-300 bg-gray-50 text-gray-800 dark:border-gray-500 dark:bg-slate-600 dark:text-slate-100",
  green:
    "border-green-400 bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-900 dark:text-green-300",
  yellow:
    "border-yellow-400 bg-yellow-100 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
  indigo:
    "border-indigo-400 bg-indigo-100 text-indigo-800 dark:border-indigo-500 dark:bg-indigo-800 dark:text-indigo-200",
} as const;
type Variant = keyof typeof colorVariants;

withDefaults(defineProps<{ variant?: Variant }>(), { variant: "gray" });
</script>
