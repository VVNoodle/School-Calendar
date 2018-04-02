<template>
  <div>
        <h2 v-if="user.username">{{user.username}}</h2>
    <ul>
        <li><router-link to="/" exact>Home</router-link></li> 
        <div v-if="user.username">
          <li><router-link to="/calendar" exact>Calendar</router-link></li>
          <li><a href="/auth/logout" exact>Logout</a></li>
        </div>
        <div v-else>
        <li><router-link to="/login" exact>Login</router-link></li>
        </div>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
