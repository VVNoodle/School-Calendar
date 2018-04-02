import App from "./components/App.vue";
import Home from "./components/Home.vue";
import Home from "./components/Login.vue";
import Calendar from "./components/Calendar.vue";

export default [
  {
    path: "/",
    component: Home
  },
  {
    path: "/calendar",
    component: Calendar
  }
];
