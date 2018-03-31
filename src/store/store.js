import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentYear: 2018,
    currentMonth: 3,
    x: 0,
    y: 0,
    active: false
  },
  mutations: {
    setCurrentMonth(state, payload) {
      state.currentMonth = payload;
    },
    setCurrentYear(state, payload) {
      state.currentYear = payload;
    },
    eventFormPos(state, payload) {
      state.x = payload.x;
      state.y = payload.y;
    },
    alterForm(state, payload) {
      state.active = payload;
    }
  }
});
