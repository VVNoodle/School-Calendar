import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import moment from "moment-timezone";
moment.tz.setDefault("UTC");

export default new Vuex.Store({
  state: {
    currentYear: 2018,
    currentMonth: 3,
    x: 0,
    y: 0,
    active: false,
    events: [
      {
        description: "Random event",
        date: moment("2018-03-04", "YYYY-MM-DD")
      }
    ],
    time: moment()
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
    },
    addEvent(state, payload) {
      state.events.push({
        description: payload,
        date: state.time
      });
    },
    eventFormDate(state, payload) {
      state.time = payload;
    }
  }
});
