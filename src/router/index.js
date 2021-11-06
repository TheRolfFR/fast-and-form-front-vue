import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TestDB from "../views/TestDB.vue";
import BootstrapVue from "bootstrap-vue";

Vue.use(VueRouter);
Vue.use(BootstrapVue);

// bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/testdb",
    name: "Test DB",
    component: TestDB,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
