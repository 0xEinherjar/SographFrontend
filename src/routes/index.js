import { createRouter, createWebHashHistory } from "vue-router";
import { storeToRefs } from "pinia";
import Connect from "../views/connect.vue";
import Home from "../views/home.vue";
import Feed from "../views/feed.vue";
import Settings from "../views/settings.vue";
import Profile from "../views/profile.vue";
import { useAccountStore } from "../store/account.js";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: Home, meta: { auth: false } },
    { path: "/feed", component: Feed, meta: { auth: true } },
    { path: "/connect", component: Connect, meta: { auth: false } },
    { path: "/settings", component: Settings, meta: { auth: true } },
    { path: "/:profile", component: Profile, meta: { auth: false } },
  ],
});

router.beforeEach((to, from, next) => {
  const accountStore = useAccountStore();
  const { account } = storeToRefs(accountStore);
  if (to.meta?.auth && !account.value.hasAccount) next("/connect");
  next();
});

export default router;
