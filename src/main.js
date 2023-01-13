import { createApp } from "vue";

import "./styles/index.css";
import router from "./router";
import App from "./App.vue";
import setHeader from "../src/utils/setHeader";

if (localStorage.token) {
  setHeader(localStorage.token);
} else {
  setHeader(false);
}

const app = createApp(App);
app.use(router);
app.mount("#app");
