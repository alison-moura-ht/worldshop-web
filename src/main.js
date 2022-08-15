import "./assets/index.css"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/vue-router"
import pinia from "./plugins/pinia"

createApp(App).use(pinia).use(router).mount("#app");