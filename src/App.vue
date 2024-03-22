<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useAuthStore } from "./store/auth";

const { isLoggedIn } = storeToRefs(useAuthStore());

onMounted(() => {
  console.log(isLoggedIn.value ? "logged in!" : "not logged in...");
});
</script>
