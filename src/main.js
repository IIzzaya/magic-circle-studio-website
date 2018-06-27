import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import utils from "./modules/utils";
import store from "./store/store";
import Vuetify from "vuetify";
import "vuetify/src/stylus/main.styl";
import "vuetify/src/stylus/settings/_colors.styl";
import "@/styles/main.styl";

global.store = store;
global.router = router;
global.utils = utils;

Vue.use(Vuetify);

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App),
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
});
