import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import moment from "moment-timezone";
moment.tz.setDefault("UTC");

import Axios from "axios";

export default new Vuex.Store({
  state: {
    currentYear: moment().year(),
    currentMonth: moment().month() + 1,
    x: 0,
    y: 0,
    active: false,
    events: [],
    time: moment(),
    loggedIn: false,
    user: {
      username: "",
      googleId: ""
    }
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
      state.events.push(payload);
    },
    eventFormDate(state, payload) {
      state.time = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    addEvent(context, payload) {
      return new Promise((resolve, reject) => {
        const obj = {
          description: payload,
          date: context.state.time
        };
        Axios.post("/add_event", obj).then(response => {
          if (response.status === 200) {
            context.commit("addEvent", obj);
            resolve();
          } else {
            reject();
          }
        });
      });
    }
  }
});
