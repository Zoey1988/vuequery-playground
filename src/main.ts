import { createApp } from "vue";
import router from "./router";
import VueQueryPlugin from "./plugins/vue-query";

import "./style.css";
import App from "./App.vue";

createApp(App).use(router).use(VueQueryPlugin).mount("#app");
