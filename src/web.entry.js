import Vue from "vue";
import "./style.scss";
import store from "./store/store";

import moment from "moment-timezone";
moment.tz.setDefault("UTC");

// add moment as an instance method
Object.defineProperty(Vue.prototype, "$moment", {
  get() {
    return this.$root.moment;
  }
});

import App from "./components/App.vue";

new Vue({
  el: "#app",
  data: {
    moment
  },
  components: {
    App
  },
  store
});
