import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import "./style.css";

createApp(App).use(router).use(createPinia()).mount("#app");
