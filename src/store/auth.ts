import { acceptHMRUpdate, defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

const { VITE_API_URL = "" } = import.meta.env;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    apiKey: useStorage<string | null>("apiKey", null),
    baseUrl: useStorage<string>("baseUrl", VITE_API_URL),
  }),
  getters: {
    isLoggedIn: ({ apiKey }) => !!apiKey,
    authorizationHeaders: ({ apiKey }) => ({
      Authorization: `Bearer ${apiKey}`,
    }),
  },
  actions: {
    logout() {
      this.apiKey = null;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
