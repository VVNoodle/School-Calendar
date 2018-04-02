import App from "./components/App.vue";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Calendar from "./components/Calendar.vue";

export default [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/calendar",
    component: Calendar
  }
];
