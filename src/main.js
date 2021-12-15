// pour faire tourner la machine

// npm install
// npm install vue-form-generator
// npm run serve

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import FastAndForm from "./FastAndForm";

Vue.use(FastAndForm, {
  dark: false,
  baseURL: "http://localhost:3004/Form_",
  edit: false,
  entities: {
    users: require("./assets/entity_user.json"),
    contributions: require("./assets/entity_contribution.json"),
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
