import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(),

  routes: [
    {
      path: "/",
      component: () => import("../pages/home.vue"),
    },

    {
      path: "/preview",
      component: () => import("../pages/preview.vue"),
    },
  ],
});
