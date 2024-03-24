import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./routes/index.js";
import Blockchain from "./infra/blockchain.js";

const pinia = createPinia();
const blockchain = new Blockchain();
blockchain.init(window);
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
