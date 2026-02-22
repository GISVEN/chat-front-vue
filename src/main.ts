import "./assets/main.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

if (import.meta.env.DEV) {
  // @ts-expect-error js framework, dont needs types
  import("render-scan");
}

app.use(createPinia());
app.use(router);
app.use(ToastPlugin, {
  position: "top-right",
});

app.mount("#app");
