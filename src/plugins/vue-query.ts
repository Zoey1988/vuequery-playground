import { App, Plugin } from "vue";
import {
  VueQueryPlugin,
  type VueQueryPluginOptions,
} from "@tanstack/vue-query";

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
};
const plugin: Plugin = {
  install(app: App) {
    app.use(VueQueryPlugin, vueQueryPluginOptions);
  },
};

export default plugin;
