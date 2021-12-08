import Vue from "vue";
import VueRouter from "vue-router";
import TestDB from "../views/TestDB.vue";
import AppList from "../views/AppList.vue";
import AppForm from "../views/AppForm.vue";
import TestFormGenerator from "../components/TestFormGenerator.vue";
import BootstrapVue from "bootstrap-vue";

Vue.use(VueRouter);
Vue.use(BootstrapVue);

// bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const routes = [
  {
    path: "/",
    redirect: "/list",
  },
  {
    path: "/testdb",
    name: "Test DB",
    component: TestDB,
  },
  {
    path: "/form/:entity/:id?",
    name: "Edit/Add",
    component: AppForm,
  },
  {
    path: "/list/:entity",
    name: "list",
    component: AppList,
  },
  {
    path: "/testformgenerator",
    name: "TestFormGenerator",
    component: TestFormGenerator,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
