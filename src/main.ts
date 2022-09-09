import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import axios from "axios";
import VueAxios from "vue-axios";
import "./styles/style.scss";

startMockWorker().then(() => {
  const app = createApp(App);
  app.use(Quasar, quasarUserOptions);
  app.use(VueAxios, axios);
  app.provide("axios", app.config.globalProperties.axios);
  app.mount("#app");
});

async function startMockWorker() {
  if (process.env.NODE_ENV === "development") {
    await import("./mocks/browser").then(({ worker }) => worker.start());
  }
}
