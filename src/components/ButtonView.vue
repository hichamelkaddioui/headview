<template>
  <button :type="type" :class="[baseClass, colorVariants[variant]]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const baseClass =
  "inline-flex items-center rounded-xl border px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-slate-500 sm:text-sm dark:disabled:bg-gray-800 dark:disabled:text-slate-200";
const colorVariants = {
  white:
    "border-gray-300 bg-white hover:bg-gray-50 focus:ring-indigo-500 dark:border-gray-500 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-800 dark:focus:ring-indigo-500 dark:focus:ring-offset-0",
  gray: "",
  indigo:
    "bg-indigo-600 text-white border-transparent shadow-sm hover:bg-indigo-700 focus:ring-indigo-500",
  red: "border border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 focus:ring-offset-2",
} as const;
type Variant = keyof typeof colorVariants;
type ButtonType = "button" | "submit";

withDefaults(defineProps<{ variant?: Variant; type?: ButtonType }>(), {
  variant: "white",
  type: "button",
});
</script>
