import Vue from "vue";
import Vuex from "vuex";
import menu from "../modules/menu";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    temp: "temp",
  },
  mutations: {
    setTemp(state, data) {
      state.temp = data;
    }
  },
  actions: {
    checkTemp({commit}) {
      let data = global.utils.localStorageManager.get("temp");
      commit("setTemp", data);
    }
  }
});

export default store;
