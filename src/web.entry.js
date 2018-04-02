import Vue from "vue";
import VueRouter from "vue-router";
import Routes from "./routes";
import "./style.scss";
import store from "./store/store";

Vue.use(VueRouter);

import moment from "moment-timezone";
moment.tz.setDefault("UTC");

// add moment as an instance method
Object.defineProperty(Vue.prototype, "$moment", {
  get() {
    return this.$root.moment;
  }
});

import App from "./components/App.vue";

let events = window.__INITIAL_STATE__.map(data => {
  return {
    description: data.description,
    date: moment(data.date)
  };
});
let initialState = Object.assign({}, store.state, {
  events
});

store.replaceState(initialState); //replace state object to whatever object we supply in arg

const router = new VueRouter({
  routes: Routes,
  mode: "history"
});

new Vue({
  el: "#app",
  data: {
    moment
  },
  components: {
    App
  },
  store,
  render(createElement) {
    return createElement("div", { attrs: { id: "app" } }, [
      createElement("app")
    ]);
  },
  router
});
